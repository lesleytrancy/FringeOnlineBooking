import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1743334021911 implements MigrationInterface {
    name = 'InitialMigration1743334021911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`event_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`seat\` (\`id\` int NOT NULL AUTO_INCREMENT, \`seatNumber\` varchar(255) NOT NULL, \`row\` varchar(255) NOT NULL, \`isAccessible\` tinyint NOT NULL, \`venueId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`ticketType\` varchar(255) NOT NULL, \`qrCode\` varchar(255) NOT NULL, \`isSold\` tinyint NOT NULL, \`eventId\` int NULL, \`seatId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`isActive\` tinyint NOT NULL, \`venueId\` int NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`venue\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`name\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`method\` varchar(255) NOT NULL, \`amount\` decimal NOT NULL, \`status\` varchar(255) NOT NULL, \`transactionId\` varchar(255) NOT NULL, \`timestamp\` datetime NOT NULL, \`userId\` int NULL, \`ticketId\` int NULL, UNIQUE INDEX \`REL_49b4a839e33590d1f711489597\` (\`ticketId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`booking_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`action\` varchar(255) NOT NULL, \`timestamp\` datetime NOT NULL, \`userId\` int NULL, \`eventId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`lastLogin\` datetime NOT NULL, \`isActive\` tinyint NOT NULL, UNIQUE INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin_settings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`settingKey\` varchar(255) NOT NULL, \`settingValue\` varchar(255) NOT NULL, \`updatedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`seat\` ADD CONSTRAINT \`FK_d8b68d8716aff39df3c430d8547\` FOREIGN KEY (\`venueId\`) REFERENCES \`venue\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_cb22a51617991265571be41b74f\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_ab9b02f72bbc7d05bd15a5cb6b4\` FOREIGN KEY (\`seatId\`) REFERENCES \`seat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_0a7a72120769940b25f994863c7\` FOREIGN KEY (\`venueId\`) REFERENCES \`venue\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_d44e52c4ca04619ef9b61a11982\` FOREIGN KEY (\`categoryId\`) REFERENCES \`event_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_b046318e0b341a7f72110b75857\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_49b4a839e33590d1f711489597b\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking_history\` ADD CONSTRAINT \`FK_70b7a3e854ad85b2d0d9793e431\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking_history\` ADD CONSTRAINT \`FK_b6756bd6452eda60c5d876dc966\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking_history\` DROP FOREIGN KEY \`FK_b6756bd6452eda60c5d876dc966\``);
        await queryRunner.query(`ALTER TABLE \`booking_history\` DROP FOREIGN KEY \`FK_70b7a3e854ad85b2d0d9793e431\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_49b4a839e33590d1f711489597b\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_b046318e0b341a7f72110b75857\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_d44e52c4ca04619ef9b61a11982\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_0a7a72120769940b25f994863c7\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_ab9b02f72bbc7d05bd15a5cb6b4\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_cb22a51617991265571be41b74f\``);
        await queryRunner.query(`ALTER TABLE \`seat\` DROP FOREIGN KEY \`FK_d8b68d8716aff39df3c430d8547\``);
        await queryRunner.query(`DROP TABLE \`admin_settings\``);
        await queryRunner.query(`DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
        await queryRunner.query(`DROP TABLE \`booking_history\``);
        await queryRunner.query(`DROP INDEX \`REL_49b4a839e33590d1f711489597\` ON \`payment\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`venue\``);
        await queryRunner.query(`DROP TABLE \`event\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP TABLE \`seat\``);
        await queryRunner.query(`DROP TABLE \`event_category\``);
    }

}
