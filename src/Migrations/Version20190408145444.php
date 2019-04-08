<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190408145444 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE Account_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('ALTER TABLE producturl DROP CONSTRAINT fk_a0a3a3f4d3b0abae');
        $this->addSql('DROP INDEX idx_a0a3a3f4d3b0abae');
        $this->addSql('ALTER TABLE producturl RENAME COLUMN entity_id_id TO entity_id');
        $this->addSql('ALTER TABLE producturl ADD CONSTRAINT FK_A0A3A3F481257D5D FOREIGN KEY (entity_id) REFERENCES Product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_A0A3A3F481257D5D ON producturl (entity_id)');
        $this->addSql('ALTER TABLE importqueue ADD type INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE Account_id_seq CASCADE');
        $this->addSql('ALTER TABLE ProductUrl DROP CONSTRAINT FK_A0A3A3F481257D5D');
        $this->addSql('DROP INDEX IDX_A0A3A3F481257D5D');
        $this->addSql('ALTER TABLE ProductUrl RENAME COLUMN entity_id TO entity_id_id');
        $this->addSql('ALTER TABLE ProductUrl ADD CONSTRAINT fk_a0a3a3f4d3b0abae FOREIGN KEY (entity_id_id) REFERENCES product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_a0a3a3f4d3b0abae ON ProductUrl (entity_id_id)');
        $this->addSql('ALTER TABLE ImportQueue DROP type');
    }
}
