<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190130180754 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER SEQUENCE Urls_id_seq INCREMENT BY 1');
        $this->addSql('ALTER SEQUENCE Users_id_seq INCREMENT BY 1');
        $this->addSql('CREATE SEQUENCE Catalog_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
//        $this->addSql('CREATE SEQUENCE Account_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE Catalog (id INT NOT NULL, pid INT DEFAULT NULL, visible BOOLEAN NOT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
//        $this->addSql('ALTER TABLE account ADD increment_by INT DEFAULT NULL');
        $this->addSql('ALTER TABLE urls ALTER type TYPE TEXT');
        $this->addSql('ALTER TABLE urls ALTER type DROP DEFAULT');
        $this->addSql('ALTER TABLE urls ALTER created DROP DEFAULT');
        $this->addSql('COMMENT ON COLUMN urls.type IS NULL');
        $this->addSql('ALTER INDEX uniq_1483a5e9e7927c74 RENAME TO UNIQ_D5428AEDE7927C74');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER SEQUENCE users_id_seq INCREMENT BY 0');
        $this->addSql('ALTER SEQUENCE urls_id_seq INCREMENT BY 0');
        $this->addSql('DROP SEQUENCE Catalog_id_seq CASCADE');
//        $this->addSql('DROP SEQUENCE Account_id_seq CASCADE');
        $this->addSql('DROP TABLE Catalog');
        $this->addSql('ALTER INDEX uniq_d5428aede7927c74 RENAME TO uniq_1483a5e9e7927c74');
        $this->addSql('ALTER TABLE Urls ALTER type TYPE TEXT');
        $this->addSql('ALTER TABLE Urls ALTER type DROP DEFAULT');
        $this->addSql('ALTER TABLE Urls ALTER created SET DEFAULT \'now()\'');
        $this->addSql('ALTER TABLE Urls ALTER created DROP NOT NULL');
        $this->addSql('COMMENT ON COLUMN Urls.type IS \'(DC2Type:array)\'');
//        $this->addSql('ALTER TABLE Account DROP increment_by');
    }
}
