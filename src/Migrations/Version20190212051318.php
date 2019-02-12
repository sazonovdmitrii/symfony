<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190212051318 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE BasketItem_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE BasketItem (id INT NOT NULL, basket_id_id INT DEFAULT NULL, product_item_id_id INT DEFAULT NULL, qty INT DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_53B529BA293CD56D ON BasketItem (basket_id_id)');
        $this->addSql('CREATE INDEX IDX_53B529BAC684DAAC ON BasketItem (product_item_id_id)');
        $this->addSql('ALTER TABLE BasketItem ADD CONSTRAINT FK_53B529BA293CD56D FOREIGN KEY (basket_id_id) REFERENCES Basket (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE BasketItem ADD CONSTRAINT FK_53B529BAC684DAAC FOREIGN KEY (product_item_id_id) REFERENCES ProductItem (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE BasketItem_id_seq CASCADE');
        $this->addSql('DROP TABLE BasketItem');
    }
}
