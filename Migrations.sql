create table admin_panel_user (
	`id` int auto_increment not null,
	`firstName` varchar(255) null,
	`lastName` varchar(255) null,
	`role` enum('super-admin', 'admin-manager', 'admin-user', 'admin-guest') null,
	`email` varchar(255) not null,
	`password` varchar(255) not null,
	`status` int(11) not null,
	`deletedAt` timestamp(6) null,
	`createdAt` timestamp(6) default CURRENT_TIMESTAMP(6) not null,
	`modifiedAt` timestamp(6) default CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6) not null,
	primary key (`id`),
	unique key (`email`)
);

create table `admin_panel_user_access_tokens` (
  `id` int(11) not null auto_increment,
  `userId` int(11) not null,
  `token` varchar(1000) not null,
  `geoIpCountry` varchar(255) default null,
  `ipAddress` varchar(255) default null,
  `userAgent` varchar(255) default null,
  `status` enum('CURRENT', 'EXPIRED') not null,
	`expiresAt` timestamp(6) null,
	`deletedAt` timestamp(6) null,
	`createdAt` timestamp(6) default CURRENT_TIMESTAMP(6) not null,
	`modifiedAt` timestamp(6) default CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6) not null,
	primary key (`id`),
	key (`userId`),
	foreign key (`userId`) references `admin_panel_user` (`id`) on delete no action on update no action
);

create table `admin_panel_user_login_secrets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otpRef` varchar(255) DEFAULT NULL,
  `otpExpiresAt` timestamp(6) NULL,
  `cookieToken` varchar(255) DEFAULT NULL,
  `cookieTokenExpiresAt` timestamp(6) NULL,
  `deletedAt` timestamp(6) NULL,
  `createdAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
  `modifiedAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `admin_panel_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table `admin_panel_sh_account_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shAccountId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `note` varchar(1000) NOT NULL,
  `isPinned` tinyint(4) DEFAULT 0,
	`deletedAt` timestamp(6) NULL,
	`createdAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
	`modifiedAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `admin_panel_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  KEY (`shAccountId`),
  FOREIGN KEY (`shAccountId`) REFERENCES `sh_account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table `admin_panel_sh_account_assignees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` enum('SALES','SUCCESS') NULL,
  `shAccountId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
	`deletedAt` timestamp(6) NULL,
	`createdAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
	`modifiedAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `admin_panel_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  KEY (`shAccountId`),
  FOREIGN KEY (`shAccountId`) REFERENCES `sh_account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table `admin_panel_user_application_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `table` enum('USER','ACCOUNT') NULL,
  `columns` text NOT NULL,
	`deletedAt` timestamp(6) NULL,
	`createdAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
	`modifiedAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `admin_panel_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table `signup_black_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `type` enum('Email','IP','Domain') DEFAULT "Domain",
  `reasonType` varchar(255) NOT NULL,
  `note` varchar(1000) NOT NULL,
	`deletedAt` timestamp(6) NULL,
	`createdAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
	`modifiedAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `admin_panel_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

ALTER TABLE user_token ADD adminUserId INT DEFAULT NULL NULL;

ALTER TABLE sh_account MODIFY COLUMN status int(11) DEFAULT 1 NOT NULL;


Phase 2 Migrations:

-- ALTER TABLE account_subscription ADD paymentMethod varchar(255) DEFAULT NULL NULL;

ALTER TABLE account_subscription MODIFY COLUMN paymentMethod enum('null','stripe','2checkout','razorpay','bank-transfer','offline-payment','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;

ALTER TABLE account_subscription ADD renewalType enum('automatic','manual') DEFAULT 'automatic' NULL;

ALTER TABLE lead_finder_reveal_history ADD historyType enum('requested','consumed') DEFAULT 'requested';

-- ALTER TABLE user ADD contactableProspect enum('0 - 2k','2k - 40k','40k - 100k','100k - 500k','500k+','Other') DEFAULT NULL NULL;
-- ALTER TABLE user ADD priorColdEmailToolExperience enum("Yes, I have","No, I have not","Not, really, but I've used an email marketing tool") DEFAULT NULL NULL;

ALTER TABLE plan ADD createdBy INT(11) DEFAULT NULL, ADD FOREIGN KEY (createdBy) REFERENCES admin_panel_user(id);

ALTER TABLE admin_panel_user_application_settings MODIFY COLUMN `table` enum('USER','ACCOUNT','PLAN') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;

CREATE TABLE `admin_panel_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `adminUserId` int(11) NOT NULL,
  `deletedAt` timestamp(6) NULL,
  `createdAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
  `modifiedAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY (`adminUserId`),
  FOREIGN KEY (`adminUserId`) REFERENCES `admin_panel_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table `admin_panel_account_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shAccountId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
	`deletedAt` timestamp(6) NULL,
	`createdAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
	`modifiedAt` timestamp(6) DEFAULT CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `admin_panel_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  KEY (`shAccountId`),
  FOREIGN KEY (`shAccountId`) REFERENCES `sh_account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  KEY (`tagId`),
  FOREIGN KEY (`tagId`) REFERENCES `admin_panel_tags` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

ALTER TABLE agency_user_token ADD adminUserId INT DEFAULT NULL NULL;

