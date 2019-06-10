<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190610145239 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE Sale_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE Sale (id INT NOT NULL, category_id INT DEFAULT NULL, start TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, finish TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, discount INT DEFAULT NULL, enabled BOOLEAN DEFAULT NULL, featured BOOLEAN DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, prior INT DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_45796F3B12469DE2 ON Sale (category_id)');
        $this->addSql('ALTER TABLE Sale ADD CONSTRAINT FK_45796F3B12469DE2 FOREIGN KEY (category_id) REFERENCES Catalog (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE Sale_id_seq CASCADE');
        $this->addSql('DROP TABLE Sale');
    }
}
