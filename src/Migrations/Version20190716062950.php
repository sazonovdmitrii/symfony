<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190716062950 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE UserAddress_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE UserAddress (id INT NOT NULL, entity_id INT DEFAULT NULL, region_id INT DEFAULT NULL, person VARCHAR(255) DEFAULT NULL, postcode VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, street VARCHAR(255) DEFAULT NULL, address TEXT DEFAULT NULL, kladr_id VARCHAR(255) DEFAULT NULL, fias_id VARCHAR(255) DEFAULT NULL, options VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D80E257481257D5D ON UserAddress (entity_id)');
        $this->addSql('CREATE INDEX IDX_D80E257498260155 ON UserAddress (region_id)');
        $this->addSql('ALTER TABLE UserAddress ADD CONSTRAINT FK_D80E257481257D5D FOREIGN KEY (entity_id) REFERENCES Users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE UserAddress ADD CONSTRAINT FK_D80E257498260155 FOREIGN KEY (region_id) REFERENCES Region (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE UserAddress_id_seq CASCADE');
        $this->addSql('DROP TABLE UserAddress');
    }
}
