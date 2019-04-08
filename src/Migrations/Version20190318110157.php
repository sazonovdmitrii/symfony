<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190318110157 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

//        $this->addSql('CREATE SEQUENCE ProductUrl_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
//        $this->addSql('CREATE TABLE ProductUrl (id INT NOT NULL, entity_id_id INT DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
//        $this->addSql('CREATE INDEX IDX_A0A3A3F4D3B0ABAE ON ProductUrl (entity_id_id)');
//        $this->addSql('ALTER TABLE ProductUrl ADD CONSTRAINT FK_A0A3A3F4D3B0ABAE FOREIGN KEY (entity_id_id) REFERENCES Product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
//        $this->addSql('ALTER TABLE productitem DROP image');
//        $this->addSql('ALTER TABLE productitem ALTER updatedat SET NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE ProductUrl_id_seq CASCADE');
        $this->addSql('DROP TABLE ProductUrl');
//        $this->addSql('ALTER TABLE ProductItem ADD image VARCHAR(255) NOT NULL');
//        $this->addSql('ALTER TABLE ProductItem ALTER updatedAt DROP NOT NULL');
    }
}
