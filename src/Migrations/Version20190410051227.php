<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190410051227 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE ImportQueueRelation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ImportRelation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE ImportQueueRelation (id INT NOT NULL, sku VARCHAR(255) DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, price NUMERIC(2, 2) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE ImportRelation (id INT NOT NULL, entity_id INT DEFAULT NULL, sku VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_31C3155681257D5D ON ImportRelation (entity_id)');
        $this->addSql('ALTER TABLE ImportRelation ADD CONSTRAINT FK_31C3155681257D5D FOREIGN KEY (entity_id) REFERENCES ProductItem (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE ImportQueueRelation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ImportRelation_id_seq CASCADE');
        $this->addSql('DROP TABLE ImportQueueRelation');
        $this->addSql('DROP TABLE ImportRelation');
    }
}
