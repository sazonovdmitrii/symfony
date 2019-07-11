<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190711085235 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE Courier_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE Courier (id INT NOT NULL, direction_id INT DEFAULT NULL, city_id INT DEFAULT NULL, avarda_id VARCHAR(255) DEFAULT NULL, direction_title VARCHAR(255) DEFAULT NULL, city_title VARCHAR(255) DEFAULT NULL, city_short_title VARCHAR(255) DEFAULT NULL, city_latitude VARCHAR(255) DEFAULT NULL, city_longitude VARCHAR(255) DEFAULT NULL, city_kladr VARCHAR(255) DEFAULT NULL, city_fias VARCHAR(255) DEFAULT NULL, post_code VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, comment TEXT DEFAULT NULL, price DOUBLE PRECISION DEFAULT NULL, price_source VARCHAR(255) DEFAULT NULL, latitude VARCHAR(255) DEFAULT NULL, longitude VARCHAR(255) DEFAULT NULL, phones VARCHAR(255) DEFAULT NULL, schedule VARCHAR(255) DEFAULT NULL, delivery_days VARCHAR(255) DEFAULT NULL, delivery_days_source VARCHAR(255) DEFAULT NULL, min_order_sum DOUBLE PRECISION DEFAULT NULL, wholesale BOOLEAN DEFAULT NULL, retail BOOLEAN DEFAULT NULL, pvz_id INT DEFAULT NULL, pvz_title VARCHAR(255) DEFAULT NULL, visible BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AE75E0AF73D997 ON Courier (direction_id)');
        $this->addSql('CREATE INDEX IDX_AE75E08BAC62AF ON Courier (city_id)');
        $this->addSql('ALTER TABLE Courier ADD CONSTRAINT FK_AE75E0AF73D997 FOREIGN KEY (direction_id) REFERENCES Direction (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE Courier ADD CONSTRAINT FK_AE75E08BAC62AF FOREIGN KEY (city_id) REFERENCES City (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE Courier_id_seq CASCADE');
        $this->addSql('DROP TABLE Courier');
    }
}
