<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190613205457 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE tags ADD test2 TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE tags DROP binary1');
        $this->addSql('ALTER TABLE tags DROP blob');
        $this->addSql('ALTER TABLE tags DROP json_array');
        $this->addSql('ALTER TABLE tags RENAME COLUMN object TO test3');
        $this->addSql('COMMENT ON COLUMN tags.test2 IS \'(DC2Type:json)\'');
        $this->addSql('COMMENT ON COLUMN tags.test1 IS \'(DC2Type:json_array)\'');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE Tags ADD binary1 BYTEA DEFAULT NULL');
        $this->addSql('ALTER TABLE Tags ADD blob BYTEA DEFAULT NULL');
        $this->addSql('ALTER TABLE Tags ADD json_array TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE Tags DROP test2');
        $this->addSql('ALTER TABLE Tags RENAME COLUMN test3 TO object');
        $this->addSql('COMMENT ON COLUMN Tags.json_array IS \'(DC2Type:json_array)\'');
        $this->addSql('COMMENT ON COLUMN Tags.test1 IS \'(DC2Type:json)\'');
    }
}
