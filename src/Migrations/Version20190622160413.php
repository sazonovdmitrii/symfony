<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190622160413 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE product_producttagitem (product_id INT NOT NULL, producttagitem_id INT NOT NULL, PRIMARY KEY(product_id, producttagitem_id))');
        $this->addSql('CREATE INDEX IDX_9B887EED4584665A ON product_producttagitem (product_id)');
        $this->addSql('CREATE INDEX IDX_9B887EED2121EB61 ON product_producttagitem (producttagitem_id)');
        $this->addSql('ALTER TABLE product_producttagitem ADD CONSTRAINT FK_9B887EED4584665A FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product_producttagitem ADD CONSTRAINT FK_9B887EED2121EB61 FOREIGN KEY (producttagitem_id) REFERENCES ProductTagItem (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE product_producttagitem');
    }
}
