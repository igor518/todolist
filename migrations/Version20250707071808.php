<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250707071808 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE task (id INT AUTO_INCREMENT NOT NULL, user_id_id INT DEFAULT NULL, task_list_id INT NOT NULL, assigned_user_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, status VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', progress SMALLINT NOT NULL, due_date DATETIME NOT NULL, INDEX IDX_527EDB259D86650F (user_id_id), INDEX IDX_527EDB25224F3C61 (task_list_id), INDEX IDX_527EDB25ADF66B1A (assigned_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE task_list (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_377B6C637E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE task_list_user (id INT AUTO_INCREMENT NOT NULL, task_list_id INT NOT NULL, user_id INT NOT NULL, role VARCHAR(255) NOT NULL, INDEX IDX_B777C4F1224F3C61 (task_list_id), INDEX IDX_B777C4F1A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, street VARCHAR(255) NOT NULL, postcode VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB259D86650F FOREIGN KEY (user_id_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25224F3C61 FOREIGN KEY (task_list_id) REFERENCES task_list (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25ADF66B1A FOREIGN KEY (assigned_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE task_list ADD CONSTRAINT FK_377B6C637E3C61F9 FOREIGN KEY (owner_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE task_list_user ADD CONSTRAINT FK_B777C4F1224F3C61 FOREIGN KEY (task_list_id) REFERENCES task_list (id)');
        $this->addSql('ALTER TABLE task_list_user ADD CONSTRAINT FK_B777C4F1A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB259D86650F');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25224F3C61');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25ADF66B1A');
        $this->addSql('ALTER TABLE task_list DROP FOREIGN KEY FK_377B6C637E3C61F9');
        $this->addSql('ALTER TABLE task_list_user DROP FOREIGN KEY FK_B777C4F1224F3C61');
        $this->addSql('ALTER TABLE task_list_user DROP FOREIGN KEY FK_B777C4F1A76ED395');
        $this->addSql('DROP TABLE task');
        $this->addSql('DROP TABLE task_list');
        $this->addSql('DROP TABLE task_list_user');
        $this->addSql('DROP TABLE `user`');
    }
}
