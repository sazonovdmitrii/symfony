<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190319094741 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE catalogurl ADD entity_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE catalogurl ADD CONSTRAINT FK_291BA35281257D5D FOREIGN KEY (entity_id) REFERENCES Catalog (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_291BA35281257D5D ON catalogurl (entity_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE CatalogUrl DROP CONSTRAINT FK_291BA35281257D5D');
        $this->addSql('DROP INDEX IDX_291BA35281257D5D');
        $this->addSql('ALTER TABLE CatalogUrl DROP entity_id');
    }
}
