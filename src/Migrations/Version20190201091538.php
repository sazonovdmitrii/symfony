<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190201091538 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE product_catalogproduct DROP CONSTRAINT fk_cb14854bf2252dfa');
        $this->addSql('DROP SEQUENCE catalogproduct_id_seq CASCADE');
        $this->addSql('DROP TABLE catalogproduct');
        $this->addSql('DROP TABLE product_catalogproduct');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE catalogproduct_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE catalogproduct (id INT NOT NULL, product_id INT NOT NULL, catalog_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE product_catalogproduct (product_id INT NOT NULL, catalogproduct_id INT NOT NULL, PRIMARY KEY(product_id, catalogproduct_id))');
        $this->addSql('CREATE INDEX idx_cb14854bf2252dfa ON product_catalogproduct (catalogproduct_id)');
        $this->addSql('CREATE INDEX idx_cb14854b4584665a ON product_catalogproduct (product_id)');
        $this->addSql('ALTER TABLE product_catalogproduct ADD CONSTRAINT fk_cb14854b4584665a FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product_catalogproduct ADD CONSTRAINT fk_cb14854bf2252dfa FOREIGN KEY (catalogproduct_id) REFERENCES catalogproduct (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
