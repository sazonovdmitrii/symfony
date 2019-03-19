<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190319094316 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE catalogurl DROP CONSTRAINT fk_291ba352d3b0abae');
        $this->addSql('DROP INDEX idx_291ba352d3b0abae');
        $this->addSql('ALTER TABLE catalogurl DROP entity_id_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE CatalogUrl ADD entity_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE CatalogUrl ADD CONSTRAINT fk_291ba352d3b0abae FOREIGN KEY (entity_id_id) REFERENCES catalog (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_291ba352d3b0abae ON CatalogUrl (entity_id_id)');
    }
}
