<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190201091201 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE product_catalogproduct (product_id INT NOT NULL, catalogproduct_id INT NOT NULL, PRIMARY KEY(product_id, catalogproduct_id))');
        $this->addSql('CREATE INDEX IDX_CB14854B4584665A ON product_catalogproduct (product_id)');
        $this->addSql('CREATE INDEX IDX_CB14854BF2252DFA ON product_catalogproduct (catalogproduct_id)');
        $this->addSql('ALTER TABLE product_catalogproduct ADD CONSTRAINT FK_CB14854B4584665A FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product_catalogproduct ADD CONSTRAINT FK_CB14854BF2252DFA FOREIGN KEY (catalogproduct_id) REFERENCES CatalogProduct (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE urls ALTER created SET NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE product_catalogproduct');
        $this->addSql('ALTER TABLE Urls ALTER created DROP NOT NULL');
    }
}
