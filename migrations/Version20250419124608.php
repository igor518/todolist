<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250419124608 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB259D86650F');
        $this->addSql('DROP INDEX IDX_527EDB259D86650F ON task');
        $this->addSql('ALTER TABLE task ADD task_list_id INT DEFAULT NULL, ADD assigned_user_id INT DEFAULT NULL, ADD progress SMALLINT NOT NULL, ADD due_date DATETIME NOT NULL, CHANGE user_id user_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25224F3C61 FOREIGN KEY (task_list_id) REFERENCES task_list (id)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25ADF66B1A FOREIGN KEY (assigned_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB259D86650F FOREIGN KEY (user_id_id) REFERENCES `user` (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_527EDB25224F3C61 ON task (task_list_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_527EDB25ADF66B1A ON task (assigned_user_id)');
        $this->addSql('CREATE INDEX IDX_527EDB259D86650F ON task (user_id_id)');
        $this->addSql('ALTER TABLE task_list DROP FOREIGN KEY FK_377B6C638FDDAB70');
        $this->addSql('DROP INDEX UNIQ_377B6C638FDDAB70 ON task_list');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE task_list DROP FOREIGN KEY FK_377B6C638FDDAB70');
        $this->addSql('DROP INDEX UNIQ_377B6C638FDDAB70 ON task_list');
        $this->addSql('ALTER TABLE task_list CHANGE owner_id_id owner_id INT NOT NULL');
        $this->addSql('ALTER TABLE task_list ADD CONSTRAINT FK_377B6C638FDDAB70 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_377B6C638FDDAB70 ON task_list (owner_id)');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25224F3C61');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25ADF66B1A');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB259D86650F');
        $this->addSql('DROP INDEX UNIQ_527EDB25224F3C61 ON task');
        $this->addSql('DROP INDEX UNIQ_527EDB25ADF66B1A ON task');
        $this->addSql('DROP INDEX IDX_527EDB259D86650F ON task');
        $this->addSql('ALTER TABLE task ADD user_id INT DEFAULT NULL, DROP user_id_id, DROP task_list_id, DROP assigned_user_id, DROP progress, DROP due_date');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB259D86650F FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_527EDB259D86650F ON task (user_id)');
    }
}
