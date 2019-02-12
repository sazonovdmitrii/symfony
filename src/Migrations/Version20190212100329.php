<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190212100329 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE "Order" ADD payment_method_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "Order" ADD CONSTRAINT FK_34E8BC9CA0CE293E FOREIGN KEY (payment_method_id_id) REFERENCES PaymentMethod (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_34E8BC9CA0CE293E ON "Order" (payment_method_id_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "Order" DROP CONSTRAINT FK_34E8BC9CA0CE293E');
        $this->addSql('DROP INDEX IDX_34E8BC9CA0CE293E');
        $this->addSql('ALTER TABLE "Order" DROP payment_method_id_id');
    }
}
