<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190702143311 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE OrderItem_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE OrderItem (id INT NOT NULL, item_id INT DEFAULT NULL, entity_id INT DEFAULT NULL, qty INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_33E85E19126F525E ON OrderItem (item_id)');
        $this->addSql('CREATE INDEX IDX_33E85E1981257D5D ON OrderItem (entity_id)');
        $this->addSql('ALTER TABLE OrderItem ADD CONSTRAINT FK_33E85E19126F525E FOREIGN KEY (item_id) REFERENCES ProductItem (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE OrderItem ADD CONSTRAINT FK_33E85E1981257D5D FOREIGN KEY (entity_id) REFERENCES Orders (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE OrderItem_id_seq CASCADE');
        $this->addSql('DROP TABLE OrderItem');
    }
}
