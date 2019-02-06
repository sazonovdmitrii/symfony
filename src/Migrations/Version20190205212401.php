<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190205212401 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE productitem_product (productitem_id INT NOT NULL, product_id INT NOT NULL, PRIMARY KEY(productitem_id, product_id))');
        $this->addSql('CREATE INDEX IDX_2A850E188920F479 ON productitem_product (productitem_id)');
        $this->addSql('CREATE INDEX IDX_2A850E184584665A ON productitem_product (product_id)');
        $this->addSql('ALTER TABLE productitem_product ADD CONSTRAINT FK_2A850E188920F479 FOREIGN KEY (productitem_id) REFERENCES ProductItem (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE productitem_product ADD CONSTRAINT FK_2A850E184584665A FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE productitem_product');
    }
}
