<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190318130704 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE CatalogUrl_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE CatalogUrl (id INT NOT NULL, entity_id_id INT DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_291BA352D3B0ABAE ON CatalogUrl (entity_id_id)');
        $this->addSql('ALTER TABLE CatalogUrl ADD CONSTRAINT FK_291BA352D3B0ABAE FOREIGN KEY (entity_id_id) REFERENCES Catalog (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
//        $this->addSql('ALTER TABLE productitem ALTER updatedat SET NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE CatalogUrl_id_seq CASCADE');
        $this->addSql('DROP TABLE CatalogUrl');
//        $this->addSql('ALTER TABLE ProductItem ALTER updatedAt DROP NOT NULL');
    }
}
