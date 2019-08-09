<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190809161100 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE producttag_catalog (producttag_id INT NOT NULL, catalog_id INT NOT NULL, PRIMARY KEY(producttag_id, catalog_id))');
        $this->addSql('CREATE INDEX IDX_D931B0BE91B6F4D1 ON producttag_catalog (producttag_id)');
        $this->addSql('CREATE INDEX IDX_D931B0BECC3C66FC ON producttag_catalog (catalog_id)');
        $this->addSql('ALTER TABLE producttag_catalog ADD CONSTRAINT FK_D931B0BE91B6F4D1 FOREIGN KEY (producttag_id) REFERENCES ProductTag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE producttag_catalog ADD CONSTRAINT FK_D931B0BECC3C66FC FOREIGN KEY (catalog_id) REFERENCES Catalog (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE producttag_catalog');
    }
}
