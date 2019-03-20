<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190320132949 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE productitem ADD entity_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE productitem ADD updated TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE productitem ADD status BOOLEAN DEFAULT NULL');
        $this->addSql('ALTER TABLE productitem ADD avarda_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE productitem ADD CONSTRAINT FK_94F1481281257D5D FOREIGN KEY (entity_id) REFERENCES Product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_94F1481281257D5D ON productitem (entity_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE ProductItem DROP CONSTRAINT FK_94F1481281257D5D');
        $this->addSql('DROP INDEX IDX_94F1481281257D5D');
        $this->addSql('ALTER TABLE ProductItem DROP entity_id');
        $this->addSql('ALTER TABLE ProductItem DROP updated');
        $this->addSql('ALTER TABLE ProductItem DROP status');
        $this->addSql('ALTER TABLE ProductItem DROP avarda_id');
    }
}
