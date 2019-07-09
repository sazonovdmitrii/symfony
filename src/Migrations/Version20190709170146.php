<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190709170146 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE city DROP CONSTRAINT fk_8d69ad0ae5498001');
        $this->addSql('DROP INDEX idx_8d69ad0ae5498001');
        $this->addSql('ALTER TABLE city ADD fias_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE city ADD kladr_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE city DROP "вdistrict_id"');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE City ADD "вdistrict_id" INT DEFAULT NULL');
        $this->addSql('ALTER TABLE City DROP fias_id');
        $this->addSql('ALTER TABLE City DROP kladr_id');
        $this->addSql('ALTER TABLE City ADD CONSTRAINT fk_8d69ad0ae5498001 FOREIGN KEY ("вdistrict_id") REFERENCES district (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_8d69ad0ae5498001 ON City (вdistrict_id)');
    }
}
