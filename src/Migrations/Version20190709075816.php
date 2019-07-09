<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190709075816 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE Pickup_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE Pickup (id INT NOT NULL, direction_id INT DEFAULT NULL, city_id INT DEFAULT NULL, avarda_id INT DEFAULT NULL, direction_title VARCHAR(255) DEFAULT NULL, city_title VARCHAR(255) DEFAULT NULL, city_short_title VARCHAR(255) DEFAULT NULL, city_latitude VARCHAR(255) DEFAULT NULL, city_longitude VARCHAR(255) DEFAULT NULL, city_kladr VARCHAR(255) DEFAULT NULL, city_fias VARCHAR(255) DEFAULT NULL, post_code INT DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, comment VARCHAR(255) DEFAULT NULL, price DOUBLE PRECISION DEFAULT NULL, price_source VARCHAR(255) DEFAULT NULL, latitude DOUBLE PRECISION NOT NULL, longitude VARCHAR(255) DEFAULT NULL, phones VARCHAR(255) DEFAULT NULL, schedule VARCHAR(255) DEFAULT NULL, delivery_days INT DEFAULT NULL, delivery_days_source VARCHAR(255) DEFAULT NULL, min_order_sum DOUBLE PRECISION DEFAULT NULL, retail BOOLEAN DEFAULT NULL, pvz_id VARCHAR(255) NOT NULL, pvz_title VARCHAR(255) DEFAULT NULL, visible BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_46323CCBAF73D997 ON Pickup (direction_id)');
        $this->addSql('CREATE INDEX IDX_46323CCB8BAC62AF ON Pickup (city_id)');
        $this->addSql('ALTER TABLE Pickup ADD CONSTRAINT FK_46323CCBAF73D997 FOREIGN KEY (direction_id) REFERENCES Direction (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE Pickup ADD CONSTRAINT FK_46323CCB8BAC62AF FOREIGN KEY (city_id) REFERENCES City (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE Pickup_id_seq CASCADE');
        $this->addSql('DROP TABLE Pickup');
    }
}
