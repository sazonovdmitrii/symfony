<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190527202632 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE address ADD person VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD zip VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD region_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD city VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD street VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD house VARCHAR(45) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD corp VARCHAR(45) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD level VARCHAR(45) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD flat VARCHAR(45) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD code VARCHAR(45) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD comment VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE address ADD active BOOLEAN DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE Address DROP person');
        $this->addSql('ALTER TABLE Address DROP zip');
        $this->addSql('ALTER TABLE Address DROP region_id');
        $this->addSql('ALTER TABLE Address DROP city');
        $this->addSql('ALTER TABLE Address DROP street');
        $this->addSql('ALTER TABLE Address DROP house');
        $this->addSql('ALTER TABLE Address DROP corp');
        $this->addSql('ALTER TABLE Address DROP level');
        $this->addSql('ALTER TABLE Address DROP flat');
        $this->addSql('ALTER TABLE Address DROP code');
        $this->addSql('ALTER TABLE Address DROP comment');
        $this->addSql('ALTER TABLE Address DROP active');
    }
}
