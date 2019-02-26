<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190226090351 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE order_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE Address_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE Orders_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE Address (id INT NOT NULL, name VARCHAR(255) NOT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE Orders (id INT NOT NULL, payment_method_id_id INT DEFAULT NULL, delivery_id_id INT DEFAULT NULL, user_id_id INT DEFAULT NULL, address_id_id INT DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E283F8D8A0CE293E ON Orders (payment_method_id_id)');
        $this->addSql('CREATE INDEX IDX_E283F8D86F4F78C5 ON Orders (delivery_id_id)');
        $this->addSql('CREATE INDEX IDX_E283F8D89D86650F ON Orders (user_id_id)');
        $this->addSql('CREATE INDEX IDX_E283F8D848E1E977 ON Orders (address_id_id)');
        $this->addSql('ALTER TABLE Orders ADD CONSTRAINT FK_E283F8D8A0CE293E FOREIGN KEY (payment_method_id_id) REFERENCES PaymentMethod (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE Orders ADD CONSTRAINT FK_E283F8D86F4F78C5 FOREIGN KEY (delivery_id_id) REFERENCES Delivery (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE Orders ADD CONSTRAINT FK_E283F8D89D86650F FOREIGN KEY (user_id_id) REFERENCES Users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE Orders ADD CONSTRAINT FK_E283F8D848E1E977 FOREIGN KEY (address_id_id) REFERENCES Address (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE "Order"');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE Orders DROP CONSTRAINT FK_E283F8D848E1E977');
        $this->addSql('DROP SEQUENCE Address_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE Orders_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE order_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "Order" (id INT NOT NULL, payment_method_id_id INT DEFAULT NULL, delivery_id_id INT DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, user_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_34e8bc9ca0ce293e ON "Order" (payment_method_id_id)');
        $this->addSql('CREATE INDEX idx_34e8bc9c6f4f78c5 ON "Order" (delivery_id_id)');
        $this->addSql('ALTER TABLE "Order" ADD CONSTRAINT fk_34e8bc9ca0ce293e FOREIGN KEY (payment_method_id_id) REFERENCES paymentmethod (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "Order" ADD CONSTRAINT fk_34e8bc9c6f4f78c5 FOREIGN KEY (delivery_id_id) REFERENCES delivery (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE Address');
        $this->addSql('DROP TABLE Orders');
    }
}

