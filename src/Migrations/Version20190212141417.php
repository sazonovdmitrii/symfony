<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190212141417 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE "Order" ADD delivery_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "Order" ADD CONSTRAINT FK_34E8BC9C6F4F78C5 FOREIGN KEY (delivery_id_id) REFERENCES Delivery (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_34E8BC9C6F4F78C5 ON "Order" (delivery_id_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "Order" DROP CONSTRAINT FK_34E8BC9C6F4F78C5');
        $this->addSql('DROP INDEX IDX_34E8BC9C6F4F78C5');
        $this->addSql('ALTER TABLE "Order" DROP delivery_id_id');
    }
}
