<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190328191016 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE ProductTagItemValue_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ProductTagValue_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ImportQueue_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE ProductTagItemValue (id INT NOT NULL, tag_item_id_id INT DEFAULT NULL, product_item_id_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1F847EC5F0F807D6 ON ProductTagItemValue (tag_item_id_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1F847EC5C684DAAC ON ProductTagItemValue (product_item_id_id)');
        $this->addSql('CREATE TABLE ProductTagValue (id INT NOT NULL, tag_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE ImportQueue (id INT NOT NULL, path VARCHAR(255) DEFAULT NULL, status TEXT DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN ImportQueue.status IS \'(DC2Type:array)\'');
        $this->addSql('ALTER TABLE ProductTagItemValue ADD CONSTRAINT FK_1F847EC5F0F807D6 FOREIGN KEY (tag_item_id_id) REFERENCES ProductTagItem (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE ProductTagItemValue ADD CONSTRAINT FK_1F847EC5C684DAAC FOREIGN KEY (product_item_id_id) REFERENCES ProductItem (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE ProductTagItemValue_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ProductTagValue_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ImportQueue_id_seq CASCADE');
        $this->addSql('DROP TABLE ProductTagItemValue');
        $this->addSql('DROP TABLE ProductTagValue');
        $this->addSql('DROP TABLE ImportQueue');
    }
}
