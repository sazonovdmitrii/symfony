<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190313174047 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE ProductItemImage_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE ProductItemImage (id INT NOT NULL, product_item_id_id INT NOT NULL, path VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E157C992C684DAAC ON ProductItemImage (product_item_id_id)');
        $this->addSql('ALTER TABLE ProductItemImage ADD CONSTRAINT FK_E157C992C684DAAC FOREIGN KEY (product_item_id_id) REFERENCES ProductItem (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE productitem ALTER image SET NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE ProductItemImage_id_seq CASCADE');
        $this->addSql('DROP TABLE ProductItemImage');
        $this->addSql('ALTER TABLE ProductItem ALTER image DROP NOT NULL');
    }
}
