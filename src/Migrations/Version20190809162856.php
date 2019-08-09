<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190809162856 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE producttagitem_catalog (producttagitem_id INT NOT NULL, catalog_id INT NOT NULL, PRIMARY KEY(producttagitem_id, catalog_id))');
        $this->addSql('CREATE INDEX IDX_DD15FFAE2121EB61 ON producttagitem_catalog (producttagitem_id)');
        $this->addSql('CREATE INDEX IDX_DD15FFAECC3C66FC ON producttagitem_catalog (catalog_id)');
        $this->addSql('ALTER TABLE producttagitem_catalog ADD CONSTRAINT FK_DD15FFAE2121EB61 FOREIGN KEY (producttagitem_id) REFERENCES ProductTagItem (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE producttagitem_catalog ADD CONSTRAINT FK_DD15FFAECC3C66FC FOREIGN KEY (catalog_id) REFERENCES Catalog (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE producttagitem_catalog');
    }
}
