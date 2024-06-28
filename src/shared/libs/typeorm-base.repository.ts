import { BaseFilterCoreDto } from './base-filter-core.dto';
import {
  deepClone,
  mergeDeep,
  removeEmpty,
  replaceStringWithVariables,
} from '../modules/common/common.helper';
import {
  Between,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  IsNull,
  Like,
  Not,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Logger } from '@nestjs/common';

type ErrorMessageType = 'NOT_FOUND' | 'DELETED';

export type ServiceErrorMessage = {
  [key in ErrorMessageType]: string;
};

export abstract class TypeormBaseRepository<ModelEntity, ModelPaginate> {
  private entity: Repository<ModelEntity>;
  private readonly logger: Logger = new Logger(TypeormBaseRepository.name);

  protected constructor(entity: Repository<ModelEntity>) {
    this.entity = entity;
  }

  private formatWhereQuery(where) {
    Object.keys(where).forEach((ky) => {
      if (where[ky]) {
        if (typeof where[ky] === 'object') {
          if (Array.isArray(where[ky])) {
            const isArrayObj = where[ky].some((value) => {
              return typeof value == 'object';
            });
            if (isArrayObj) {
              const arrayObj = deepClone(where[ky]);
              const newWhere = [];
              arrayObj.forEach((ao) => {
                newWhere.push(this.formatWhereQuery(ao));
              });
              where[ky] = newWhere;
            } else {
              where[ky] = In(where[ky]);
            }
          } else {
            if (typeof where[ky]['notIn'] !== 'undefined') {
              where[ky] = Not(In(where[ky]['notIn']));
            } else if (typeof where[ky]['in'] !== 'undefined') {
              where[ky] = In(where[ky]['in']);
            } else if (typeof where[ky]['between'] !== 'undefined') {
              const vl = where[ky]['between'].split('|');
              where[ky] = Between(vl[0], vl[1]);
            } else if (typeof where[ky]['like'] !== 'undefined') {
              where[ky] = Like(where[ky]['like']);
            } else {
              where[ky] = this.formatWhereQuery(where[ky]);
            }
          }
        } else if (where[ky] === 'notNull') {
          where[ky] = Not(IsNull());
        } else if (where[ky] === 'NULL') {
          where[ky] = IsNull();
        }
      }
    });

    return where;
  }

  private generateQuery(query: BaseFilterCoreDto = {}, baseWhere = {}) {
    const tempQuery: any = { ...query };

    let whereQry = {};

    if (tempQuery?.where) {
      whereQry = {
        ...tempQuery.where,
        ...baseWhere,
      };
    } else {
      whereQry = {
        ...baseWhere,
      };
    }

    if (tempQuery?.search) {
      const columns: any = tempQuery?.search_column;

      const searchObjArr = JSON.parse(
        replaceStringWithVariables(columns, {
          SEARCH: `${tempQuery?.search}`,
        }),
      );

      if (tempQuery?.search_full_name) {
        const searchArr = tempQuery.search.split(' ');
        if (searchArr.length == 2) {
          searchObjArr.push(
            JSON.parse(
              replaceStringWithVariables(tempQuery.search_full_name, {
                F_SEARCH: `${searchArr[0]}`,
                L_SEARCH: `${searchArr[1]}`,
              }),
            ),
          );
        }
      }

      const whereSearch: any = [];
      searchObjArr.forEach((search, i) => {
        if (Object.keys(whereQry).length > 0) {
          whereSearch[i] = mergeDeep(deepClone(whereQry), deepClone(search));
        } else {
          whereSearch[i] = deepClone(search);
        }
      });

      tempQuery['where'] = this.formatWhereQuery(deepClone(whereSearch));
    } else if (whereQry) {
      tempQuery['where'] = this.formatWhereQuery(deepClone(whereQry));
    }

    delete tempQuery?.search_column;
    delete tempQuery?.search;

    return tempQuery;
  }

  async getQueryBuilderPaginate(params: {
    query: BaseFilterCoreDto;
    modelQuery: SelectQueryBuilder<ModelEntity>;
    isExport?: boolean;
  }): Promise<ModelPaginate | any> {
    const { modelQuery, query, isExport = false } = params;
    const { skip = 0, take = 10 } = query;

    try {
      if (isExport) {
        return modelQuery.skip(0).take(1000).getMany();
      }
      const total = await modelQuery.getCount();

      let list = await modelQuery
        .skip(skip)
        .take(take + 1)
        .getMany();

      let hasMany = false;
      if (list.length > take) {
        hasMany = true;
        list = list.slice(0, -1);
      }

      return { total, list, hasMany, count: list.length };
    } catch (e) {
      this.logger.error(`${JSON.stringify(e)}`);
    }
  }

  async findFilterPaginate(
    query: BaseFilterCoreDto,
    baseWhere = {},
    isExport = false,
  ): Promise<ModelPaginate | any> {
    const updatedQuery = this.generateQuery(removeEmpty(query), baseWhere);
    const { skip = 0, take = 10, where = {}, ...rest } = updatedQuery;

    try {
      if (isExport) {
        return this.entity.find({
          skip: 0,
          take: 500,
          where,
          relationLoadStrategy: 'query',
          ...rest,
        });
      }

      let list = await this.entity.find({
        skip,
        take: take + 1,
        where,
        relationLoadStrategy: 'query',
        ...rest,
      });

      const total = await this.entity.count({
        where,
        withDeleted: query.withDeleted,
      });

      let hasMany = false;
      if (list.length > take) {
        hasMany = true;
        list = list.slice(0, -1);
      }

      return { total, list, hasMany, count: list.length };
    } catch (e) {
      this.logger.error(`${JSON.stringify(e)}`);
    }
  }

  create(params: { data: ModelEntity | any }): Promise<ModelEntity> {
    const { data } = params;
    return this.entity.save(data);
  }

  async createMany(params: {
    data: ModelEntity[] | any;
  }): Promise<ModelEntity[]> {
    const { data } = params;
    const entities = this.entity.create(data);
    await this.entity.createQueryBuilder().insert().values(data).execute();
    return entities;
  }

  async getCount(params: { data: ModelEntity | any }): Promise<any> {
    const { data } = params;
    return this.entity.count(data);
  }

  async update(params: {
    where: FindOptionsWhere<ModelEntity>;
    data: QueryDeepPartialEntity<ModelEntity>;
  }): Promise<any> {
    const { data, where } = params;
    await this.entity.update(where, data);
    return this.findFirst({ where });
  }

  async updateMany(params: {
    where: FindOptionsWhere<ModelEntity>;
    data: ModelEntity | any;
  }): Promise<any> {
    return this.update(params);
  }

  queryBuilder(val) {
    return this.entity.createQueryBuilder(val);
  }

  async findUnique(params: FindOneOptions<ModelEntity>): Promise<ModelEntity> {
    if (typeof params.withDeleted === 'undefined') {
      params.withDeleted = true;
    }
    return this.entity.findOne(params);
  }

  async findFirst(params: FindOneOptions<ModelEntity>): Promise<ModelEntity> {
    if (typeof params.withDeleted === 'undefined') {
      params.withDeleted = true;
    }
    return this.entity.findOne(params);
  }

  async findMany(params: FindManyOptions<ModelEntity>): Promise<ModelEntity[]> {
    if (typeof params.withDeleted === 'undefined') {
      params.withDeleted = true;
    }
    return this.entity.find(params);
  }

  async getCounts(params: FindManyOptions<ModelEntity>) {
    if (typeof params.withDeleted === 'undefined') {
      params.withDeleted = true;
    }
    return this.entity.count(params);
  }

  async delete(params: { where: FindOptionsWhere<ModelEntity> }) {
    const { where } = params;
    return this.entity.delete(where);
  }

  async deleteMany(params: { where: FindOptionsWhere<ModelEntity> }) {
    const { where } = params;
    return this.entity.delete(where);
  }

  async upsert(params: {
    where: FindOptionsWhere<ModelEntity>;
    create: ModelEntity | any;
    update: ModelEntity | any;
  }) {
    const { where, create, update } = params;
    const check = await this.findFirst({ where });

    if (check) {
      return this.update({ where, data: update });
    }
    return this.create({ data: create });
  }
}
