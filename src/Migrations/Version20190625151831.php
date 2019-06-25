<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190625151831 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE CatalogTagItemValue_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE CatalogTagItemValue (id INT NOT NULL, tag_item_id INT DEFAULT NULL, catalog_item_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A21FC174205E7FF4 ON CatalogTagItemValue (tag_item_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A21FC1741DDDAF72 ON CatalogTagItemValue (catalog_item_id)');
        $this->addSql('ALTER TABLE CatalogTagItemValue ADD CONSTRAINT FK_A21FC174205E7FF4 FOREIGN KEY (tag_item_id) REFERENCES CatalogTagItem (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE CatalogTagItemValue ADD CONSTRAINT FK_A21FC1741DDDAF72 FOREIGN KEY (catalog_item_id) REFERENCES Catalog (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE CatalogTagItemValue_id_seq CASCADE');
        $this->addSql('DROP TABLE CatalogTagItemValue');
    }
}
