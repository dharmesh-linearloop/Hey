import { Transform } from 'class-transformer';
import { DATE_SETTINGS } from 'src/keys';
import { DateTime } from 'luxon';
import * as _ from 'lodash';

export const getUUID = () => {
  return Math.floor(Math.random() * Date.now()).toString(16);
};

export const arrayColumn = (arr, column: string) => {
  const returnData = [];
  arr.forEach((v, i) => {
    returnData[i] = arr[i][column];
  });
  return returnData;
};

export const arrayToIdDataArray = (arr, key: string) => {
  const returnData = {};

  for (const arrData of arr) {
    const keyData = _.get(arrData, key);
    if (typeof returnData[keyData] === 'undefined') {
      returnData[keyData] = [];
    }
    returnData[keyData].push(arrData);
  }

  return returnData;
};

export const updateDates = async (
  data: Record<string, unknown>,
  dateTimeFormat: string = DATE_SETTINGS.IST_DATE_TIME_FORMAT,
) => {
  const dateKeys = [
    'createdAt',
    'modifiedAt',
    'deletedAt',
    'startAt',
    'endAt',
    'lastSeen',
    'paidAt',
    'pausedAt',
    'pauseEndsAt',
    'subscriptionEndsAt',
    'subscriptionStartDate',
    'subscriptionEndDate',
    'expiresAt',
    'lastConnectedAt',
    'requestedAt',
    'receivedAt',
    'sentAt',
    'lastOpenedAt',
    'lastClickedAt',
    'historyIdUpdatedAt',
    'processedAt',
    'lastVerifiedAt',
    'repliedAt',
    'lastBouncedPausedAt',
    'scheduledAt',
    'lastStepProcessedAt',
    'schedulerProcessedAt',
    'bouncedAt',
    'unsubscribedAt',
    'unPausedAt',
    'updatedAt',
    'changedAt',
    'completedAt',
  ];

  await Promise.all(
    Object.keys(data).map(async (key) => {
      if (data[key]) {
        if (dateKeys.includes(key)) {
          data[key] = getUserDate({ date: data[key], dateTimeFormat });
        } else {
          if (typeof data[key] === 'object') {
            if (Array.isArray(data[key])) {
              data[key] = await updateDatesArr(
                JSON.parse(JSON.stringify(data[key])),
                dateTimeFormat,
              );
            } else {
              data[key] = await updateDates(
                JSON.parse(JSON.stringify(data[key])),
                dateTimeFormat,
              );
            }
          }
        }
      }
    }),
  );

  return data;
};

export const updateDatesArr = async (
  dataArr: [Record<string, unknown>],
  dateTimeFormat: string = DATE_SETTINGS.IST_DATE_TIME_FORMAT,
) => {
  await Promise.all(
    dataArr.map(async (data, i) => {
      dataArr[i] = await updateDates(
        JSON.parse(JSON.stringify(data)),
        dateTimeFormat,
      );
    }),
  );

  return dataArr;
};

export const getUserDate = (params: {
  date: any;
  timezone?: string;
  dateTimeFormat?: string;
}) => {
  const {
    date,
    timezone = DATE_SETTINGS.DEFAULT_TZ,
    dateTimeFormat = DATE_SETTINGS.IST_DATE_TIME_FORMAT,
  } = params;

  let validDate = DateTime.fromJSDate(date);

  if (validDate.isValid) {
    return validDate.setZone(timezone).toFormat(dateTimeFormat);
  }

  validDate = DateTime.fromISO(date);

  if (validDate.isValid) {
    return validDate.setZone(timezone).toFormat(dateTimeFormat);
  }

  return date;
};

export const getServerDate = (params: { date: string; timezone?: string }) => {
  const { date, timezone = DATE_SETTINGS.DEFAULT_TZ } = params;

  const validDate = DateTime.fromISO(date, { zone: timezone });
  if (validDate.isValid) {
    return validDate.setZone('UTC').toISO({ includeOffset: false });
  }
  return date;
};

export const isObjectID = (str: string) => {
  if (str.match(/^[0-9a-fA-F]{24}$/)) {
    // it's an ObjectID
    return true;
  } else {
    // it's a string
    return false;
  }
};

export const generateRandomString = (length: number) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const rNum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rNum, rNum + 1);
  }
  return randomString;
};

export const generateRandomOtp = (length: number) => {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1),
  );
};

export const deepClone = (obj: Record<string, unknown>) => {
  return JSON.parse(JSON.stringify(obj));
};

export const generateSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');
};

export const replaceStringWithVariables = (str: string, vars: any) => {
  let smsContent: any = str;

  // Replace the string by the value in object
  if (Object.keys(vars).length > 0) {
    Object.keys(vars).forEach((v) => {
      smsContent = smsContent.replace(new RegExp(`{${v}}`, 'g'), vars[v]);
    });
  }
  return smsContent;
};

export const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

export const isEmpty = (obj = {}) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export const removeEmpty = (obj: any = {}) => {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === '' ||
      (Array.isArray(obj[propName]) && !obj[propName].length) ||
      (typeof obj[propName] === 'object' && isEmpty(obj[propName]))
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

export const generatePromotionalCodes = (
  length: number,
  campaignId: string,
) => {
  const codes = [];

  for (let i = 0; i < length; i++)
    codes.push({
      campaignId,
      code: generateToken(10),
    });

  return codes;
};

export const generateToken = (length: number) => {
  const charset: any =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890'.match(
      /./g,
    );

  let text = '';

  for (let i = 0; i < length; i++)
    text += charset[Math.floor(Math.random() * charset.length)];

  return text;
};

export function CapitalizeWords() {
  return Transform(({ value }) => {
    if (value) {
      const words = value.split(' ');
      return words
        .map((word) => {
          return word.length > 0
            ? word[0].toUpperCase() + word.substring(1)
            : word;
        })
        .join(' ');
    } else {
      return value;
    }
  });
}

export function CapitalizeFirst() {
  return Transform(({ value }) => {
    return value ? value[0].toUpperCase() + value.substring(1) : value;
  });
}

export const convertUnderScoreToCamelCase = (string) => {
  if (string) {
    return string.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }
  return null;
};

export const convertToUTC = (string) => {
  if (string) {
    return string.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }
  return null;
};

export const generateDateTimeFromDate = (
  date: string,
  startTime = '00:00:00.000',
  endTime = '23:59:59.999',
) => {
  const startDate = `${date}T${startTime}+00:00`;
  const endDate = `${date}T${endTime}+00:00`;
  return { startDate, endDate };
};

export const firstCharUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
