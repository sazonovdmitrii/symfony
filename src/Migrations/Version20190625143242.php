<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190625143242 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE CatalogTag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE CatalogTag (id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, type VARCHAR(10) DEFAULT NULL, visible VARCHAR(3) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE catalogtag_catalog (catalogtag_id INT NOT NULL, catalog_id INT NOT NULL, PRIMARY KEY(catalogtag_id, catalog_id))');
        $this->addSql('CREATE INDEX IDX_FF7C1D4E89F9EE34 ON catalogtag_catalog (catalogtag_id)');
        $this->addSql('CREATE INDEX IDX_FF7C1D4ECC3C66FC ON catalogtag_catalog (catalog_id)');
        $this->addSql('ALTER TABLE catalogtag_catalog ADD CONSTRAINT FK_FF7C1D4E89F9EE34 FOREIGN KEY (catalogtag_id) REFERENCES CatalogTag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE catalogtag_catalog ADD CONSTRAINT FK_FF7C1D4ECC3C66FC FOREIGN KEY (catalog_id) REFERENCES Catalog (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE catalogtag_catalog DROP CONSTRAINT FK_FF7C1D4E89F9EE34');
        $this->addSql('DROP SEQUENCE CatalogTag_id_seq CASCADE');
        $this->addSql('DROP TABLE CatalogTag');
        $this->addSql('DROP TABLE catalogtag_catalog');
    }
}
