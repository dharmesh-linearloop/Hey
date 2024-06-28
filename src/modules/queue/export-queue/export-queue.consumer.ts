import {
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { UserCoreService } from 'src/core/user-core/user-core.service';
import { EXPORT_MODULES_ENUM } from 'src/keys';
import { ExportToCsv } from 'export-to-csv';
import { ShAccountCoreService } from 'src/core/sh-account-core/sh-account-core.service';
import { EmailAccountCoreService } from 'src/core/email-account-core/email-account-core.service';
import { PostmarkService } from 'src/shared/modules/postmark/postmark.service';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import {
  arrayColumn,
  updateDatesArr,
} from 'src/shared/modules/common/common.helper';
import { EmailAccountType } from 'src/core/email-account-core/email-account-core.enum';
import { SettingTableEnum } from 'src/core/admin-panel-user-application-settings-core/admin-panel-user-application-settings-core.enum';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { SharedColumnsService } from 'src/shared/modules/shared-columns/shared-columns.service';
import { AppConfigService } from '../../../app-config/app-config.service';

@Processor('export-queue')
export class ExportQueueConsumer {
  constructor(
    private userCoreService: UserCoreService,
    private shAccountCoreService: ShAccountCoreService,
    private emailAccountCoreService: EmailAccountCoreService,
    private postmarkService: PostmarkService,
    private sharedQueryService: SharedQueryService,
    private sharedColumnsService: SharedColumnsService,
    private adminPanelUserCoreService: AdminPanelUserCoreService,
    private appConfigService: AppConfigService,
  ) {}

  @Process('export-job')
  async sendNotificationJob(job: Job<unknown>, done: any) {
    const exportData: any = job.data;

    try {
      const userData = await this.adminPanelUserCoreService.findUnique({
        where: { id: exportData.userId },
      });

      let query: any = {};
      if (exportData?.filterQuery) {
        query = JSON.parse(exportData.filterQuery);
      }

      let csvPayloadArray: any = [];
      if (exportData.module === EXPORT_MODULES_ENUM.USER) {
        csvPayloadArray = await this.getUserCSVData(query, exportData.userId);
      } else if (exportData.module === EXPORT_MODULES_ENUM.ACCOUNT) {
        csvPayloadArray = await this.getAccountCSVData(
          query,
          exportData.userId,
        );
      } else if (exportData.module === EXPORT_MODULES_ENUM.EMAIL_ACCOUNT) {
        csvPayloadArray = await this.getEmailAccountCSVData(query);
      }

      if (csvPayloadArray) {
        const options: any = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          showTitle: false,
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
          // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
        };

        const csvExporter = new ExportToCsv(options);
        const csvData = csvExporter.generateCsv(csvPayloadArray, true);
        const fileBuffer = Buffer.from(csvData);

        // Convert the buffer to a Base64 encoded string
        const fileBase64 = fileBuffer.toString('base64');

        // Create the attachment object
        const attachment = {
          Content: fileBase64,
          Name: this.getCSVFileName(exportData.module),
          ContentType: 'text/csv',
          ContentID: `${Date.now()}`,
        };

        let to = userData.email;
        if (this.appConfigService.exportEmails) {
          to = `${to},${this.appConfigService.exportEmails}`;
        }

        const subject = `Your Saleshandy admin panel export is ready`;
        const htmlBody = `Hi ${userData.firstName}<br><br>
        You requested an export from the Saleshandy admin panel. Please find the attached file as per your request.<br><br> 
        Thanks,<br>
        Saleshandy Team<br>
        `;
        try {
          await this.postmarkService.sendMail({
            to,
            subject,
            htmlBody,
            attachments: [attachment],
          });
        } catch (error) {
          console.log('🚀 -----------------🚀');
          console.log('🚀 ~ ExportQueueConsumer Error:', error.message);
          console.log('🚀 -----------------🚀');
        }
      }

      done(null, 'ExportQueueConsumer completed successfully');
    } catch (e: any) {
      done(new Error(<string>(<unknown>e.message)));
      // throw new Error(<string>(<unknown>e.message));
    }
  }

  private async getUserCSVData(query, userId) {
    const modelQuery = await this.sharedQueryService.getUserQuery({ query });

    let userList = await this.userCoreService.getQueryBuilderPaginate({
      query,
      modelQuery,
      isExport: true,
    });

    userList = await updateDatesArr(userList);

    const columns = await this.sharedColumnsService.getColumnsByAdminUserId({
      userId,
      table: SettingTableEnum.USER,
    });

    const userCsvPayloadArray = userList.map((user) => {
      let userStatus: any = '-';
      if (user?.status) {
        userStatus = user.status === 0 ? 'In Active' : 'Active';
      }

      const rowData = {
        Name: `${user?.firstName} ${user?.lastName}` ?? '-',
        Email: user?.email ?? '-',
        'User ID': user?.id ?? '-',
        'Sign Up Date': user?.createdAt ?? '-',
        'Last Login': user?.lastSeen ?? '-',
        'Tracking ID': user?.trackingId ?? '-',
        Role: user?.role ?? '-',
        'Current Plan': user?.shAccount?.accountSubscription?.plan?.name ?? '-',
        Status: userStatus,
        Phone: user?.phone ?? '-',
        'Job Role': user?.designation ?? '-',
        'Use Case': user?.useCase ?? '-',
        'Sequence Created': '-',
        'Total Prospects': '-',
        'Email Account Created': '-',
        'Active Sequences': '-',
      };

      const rowDataReturn = {};
      Object.keys(rowData).map((r) => {
        const clm = columns.find((o) => o.title === r);
        if (clm?.visible === true) {
          rowDataReturn[r] = rowData[r];
          if (r === 'Name') {
            rowDataReturn['Email'] = rowData['Email'];
            rowDataReturn['Status'] = rowData['Status'];
          }
          return rowData[r];
        }
      });

      return rowDataReturn;
    });

    return userCsvPayloadArray;
  }

  private async getAccountCSVData(query, userId) {
    const modelQuery = await this.sharedQueryService.getAccountQuery({
      query,
    });

    let accountList = await this.shAccountCoreService.getQueryBuilderPaginate({
      query,
      modelQuery,
      isExport: true,
    });

    await Promise.all(
      accountList.map(async (data, i) => {
        accountList[i] = await this.sharedQueryService.getAccountMeta({
          account: accountList[i],
        });
      }),
    );

    accountList = await updateDatesArr(accountList);

    const columns = await this.sharedColumnsService.getColumnsByAdminUserId({
      userId,
      table: SettingTableEnum.ACCOUNT,
    });

    const accountCsvPayloadArray = accountList.map((account) => {
      let user: any = {};
      let userName: any = '-';
      if (account?.users) {
        user = account?.users[0];
        if (user) {
          userName = `${user?.firstName} ${user?.lastName}`;
        }
      }
      let subscription: any = {};
      if (account?.accountSubscription) {
        subscription = account?.accountSubscription;
      }

      let successOwnerUserName: any = '-';
      if (account?.accountSuccessOwner?.user) {
        const successUser = account?.accountSuccessOwner?.user;
        successOwnerUserName = `${successUser?.firstName} ${successUser?.lastName}`;
      }

      let salesOwnerUserName: any = '-';
      if (account?.accountSalesOwner?.user) {
        const saleUser = account?.accountSalesOwner?.user;
        salesOwnerUserName = `${saleUser?.firstName} ${saleUser?.lastName}`;
      }

      let accountTags: any = '-';
      if (account?.accountTags?.length > 0) {
        accountTags = arrayColumn(account.accountTags, 'name').join(', ');
      }

      const rowData = {
        'Account ID': account?.id ?? '-',
        Owner: userName ?? '-',
        'Owner Email': user?.email ?? '-',
        'Created Date': account?.createdAt ?? '-',
        Users: account?.user?.length ?? '-',
        'Current Plan': subscription?.plan?.name ?? '-',
        'Current Plan Status': subscription?.status ?? '-',
        Industry: account?.industry ?? '-',
        'Company Size': account?.teamSize ?? '-',
        Country: user?.country ?? '-',
        'Invited Team Member': '-',
        'Total Prospects': '-',
        'Sales Owner': salesOwnerUserName ?? '-',
        'Success Owner': successOwnerUserName ?? '-',
        'Payment Method Type': subscription?.paymentMethod ?? '-',
        'Renewal Type': subscription?.renewalType ?? '-',
        'Plan Start Date': subscription?.startAt ?? '-',
        'Plan End Date': subscription?.endAt ?? '-',
        Tags: accountTags ?? '-',
      };

      const rowDataReturn = {};
      Object.keys(rowData).map((r) => {
        const clm = columns.find((o) => o.title === r);
        if (clm?.visible === true) {
          rowDataReturn[r] = rowData[r];
          if (r === 'Owner') {
            rowDataReturn['Owner Email'] = rowData['Owner Email'];
          }
          if (r === 'Current Plan') {
            rowDataReturn['Current Plan Status'] =
              rowData['Current Plan Status'];
          }
          return rowData[r];
        }
      });

      return rowDataReturn;
    });

    return accountCsvPayloadArray;
  }

  private async getEmailAccountCSVData(query) {
    const modelQuery = await this.sharedQueryService.getEmailAccountQuery({
      query,
    });

    let emailAccountList =
      await this.emailAccountCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
        isExport: true,
      });

    await Promise.all(
      emailAccountList.map(async (data, i) => {
        emailAccountList[i] = await this.sharedQueryService.getEmailAccountMeta(
          {
            emailAccount: emailAccountList[i],
          },
        );
      }),
    );

    emailAccountList = await updateDatesArr(
      emailAccountList,
      'MMM d yyyy, hh:mm a (ZZZZ)',
    );

    const emailAccountCsvPayloadArray = emailAccountList.map((emailAccount) => {
      let user: any = {};
      let userName: any = '-';
      if (emailAccount?.user) {
        user = emailAccount?.user;
        userName = `${user?.firstName} ${user?.lastName}`;
      }

      const rowData = {
        ID: emailAccount?.id ?? '-',
        'Account ID': emailAccount?.shAccountId ?? '-',
        'User Name': userName ?? '-',
        'User Email': user?.email ?? '-',
        'Sender Account': emailAccount?.fromEmail ?? '-',
        'Sender Account Type': EmailAccountType[emailAccount.type] ?? '-',
        'Last Connected': emailAccount?.lastConnectedAt ?? '-',
        ESP: emailAccount?.emailServiceProvider ?? '-',
        'Email Setup Score': emailAccount?.healthScore ?? '-',
        'Daily Quota': emailAccount?.dailyQuota?.value ?? '-',
        'Custom Domain Setup': emailAccount?.dmarc ?? '-',
        'SPF Setup': emailAccount?.spf ?? '-',
      };

      return rowData;
    });

    return emailAccountCsvPayloadArray;
  }

  private getCSVFileName(module) {
    const timestamp = Date.now();
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    let name =
      module === EXPORT_MODULES_ENUM.USER ? 'User-Data' : 'Account-Data';

    name =
      module === EXPORT_MODULES_ENUM.EMAIL_ACCOUNT
        ? 'Email-Account-Data'
        : name;

    return `${name}-${year}-${month}-${day}.csv`;
  }

  @OnQueueCompleted({
    name: 'export-job',
  })
  handleCompleted(job: Job) {
    console.log('[Export-job Completed]: JobID -> ', job.id);
  }

  @OnQueueFailed({
    name: 'export-job',
  })
  handleFailed(job: Job, error: Error) {
    console.log(
      '[Export-job Failed]: JobID -> ',
      job.id,
      error?.message ? error.message : error,
    );
  }

  @OnQueueError({
    name: 'export-job',
  })
  handleError(job: Job, error: Error) {
    console.log(
      '[Export-job Failed]: JobID -> ',
      job.id,
      error?.message ? error.message : error,
    );
  }
}
