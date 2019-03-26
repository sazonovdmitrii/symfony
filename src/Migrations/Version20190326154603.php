<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190326154603 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE producttag_product (producttag_id INT NOT NULL, product_id INT NOT NULL, PRIMARY KEY(producttag_id, product_id))');
        $this->addSql('CREATE INDEX IDX_1157865491B6F4D1 ON producttag_product (producttag_id)');
        $this->addSql('CREATE INDEX IDX_115786544584665A ON producttag_product (product_id)');
        $this->addSql('ALTER TABLE producttag_product ADD CONSTRAINT FK_1157865491B6F4D1 FOREIGN KEY (producttag_id) REFERENCES ProductTag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE producttag_product ADD CONSTRAINT FK_115786544584665A FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE producttag_product');
    }
}
