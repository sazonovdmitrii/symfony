<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190711102347 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE pickup_paymentmethod (pickup_id INT NOT NULL, paymentmethod_id INT NOT NULL, PRIMARY KEY(pickup_id, paymentmethod_id))');
        $this->addSql('CREATE INDEX IDX_E05AFC76C26E160B ON pickup_paymentmethod (pickup_id)');
        $this->addSql('CREATE INDEX IDX_E05AFC76778E3E6F ON pickup_paymentmethod (paymentmethod_id)');
        $this->addSql('CREATE TABLE courier_paymentmethod (courier_id INT NOT NULL, paymentmethod_id INT NOT NULL, PRIMARY KEY(courier_id, paymentmethod_id))');
        $this->addSql('CREATE INDEX IDX_82024DE2E3D8151C ON courier_paymentmethod (courier_id)');
        $this->addSql('CREATE INDEX IDX_82024DE2778E3E6F ON courier_paymentmethod (paymentmethod_id)');
        $this->addSql('ALTER TABLE pickup_paymentmethod ADD CONSTRAINT FK_E05AFC76C26E160B FOREIGN KEY (pickup_id) REFERENCES Pickup (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE pickup_paymentmethod ADD CONSTRAINT FK_E05AFC76778E3E6F FOREIGN KEY (paymentmethod_id) REFERENCES PaymentMethod (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE courier_paymentmethod ADD CONSTRAINT FK_82024DE2E3D8151C FOREIGN KEY (courier_id) REFERENCES Courier (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE courier_paymentmethod ADD CONSTRAINT FK_82024DE2778E3E6F FOREIGN KEY (paymentmethod_id) REFERENCES PaymentMethod (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE pickup_paymentmethod');
        $this->addSql('DROP TABLE courier_paymentmethod');
    }
}
