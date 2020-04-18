<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200409115238 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE interview_tag (interview_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_E86D6E4655D69D95 (interview_id), INDEX IDX_E86D6E46BAD26311 (tag_id), PRIMARY KEY(interview_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE interview_interviewed (interview_id INT NOT NULL, interviewed_id INT NOT NULL, INDEX IDX_5905C8AE55D69D95 (interview_id), INDEX IDX_5905C8AEC74D1AB (interviewed_id), PRIMARY KEY(interview_id, interviewed_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE interview_user (interview_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_667604AF55D69D95 (interview_id), INDEX IDX_667604AFA76ED395 (user_id), PRIMARY KEY(interview_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category_interview (category_id INT NOT NULL, interview_id INT NOT NULL, INDEX IDX_87DEE0412469DE2 (category_id), INDEX IDX_87DEE0455D69D95 (interview_id), PRIMARY KEY(category_id, interview_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE interviewed_structure (interviewed_id INT NOT NULL, structure_id INT NOT NULL, INDEX IDX_6A4FD42DC74D1AB (interviewed_id), INDEX IDX_6A4FD42D2534008B (structure_id), PRIMARY KEY(interviewed_id, structure_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE structure_user (structure_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_3C89A46B2534008B (structure_id), INDEX IDX_3C89A46BA76ED395 (user_id), PRIMARY KEY(structure_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE interview_tag ADD CONSTRAINT FK_E86D6E4655D69D95 FOREIGN KEY (interview_id) REFERENCES interview (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE interview_tag ADD CONSTRAINT FK_E86D6E46BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE interview_interviewed ADD CONSTRAINT FK_5905C8AE55D69D95 FOREIGN KEY (interview_id) REFERENCES interview (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE interview_interviewed ADD CONSTRAINT FK_5905C8AEC74D1AB FOREIGN KEY (interviewed_id) REFERENCES interviewed (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE interview_user ADD CONSTRAINT FK_667604AF55D69D95 FOREIGN KEY (interview_id) REFERENCES interview (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE interview_user ADD CONSTRAINT FK_667604AFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE category_interview ADD CONSTRAINT FK_87DEE0412469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE category_interview ADD CONSTRAINT FK_87DEE0455D69D95 FOREIGN KEY (interview_id) REFERENCES interview (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE interviewed_structure ADD CONSTRAINT FK_6A4FD42DC74D1AB FOREIGN KEY (interviewed_id) REFERENCES interviewed (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE interviewed_structure ADD CONSTRAINT FK_6A4FD42D2534008B FOREIGN KEY (structure_id) REFERENCES structure (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE structure_user ADD CONSTRAINT FK_3C89A46B2534008B FOREIGN KEY (structure_id) REFERENCES structure (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE structure_user ADD CONSTRAINT FK_3C89A46BA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE interview ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE interview ADD CONSTRAINT FK_CF1D3C34A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_CF1D3C34A76ED395 ON interview (user_id)');
        $this->addSql('ALTER TABLE question ADD interview_id INT NOT NULL');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E55D69D95 FOREIGN KEY (interview_id) REFERENCES interview (id)');
        $this->addSql('CREATE INDEX IDX_B6F7494E55D69D95 ON question (interview_id)');
        $this->addSql('ALTER TABLE category ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT FK_64C19C1A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_64C19C1A76ED395 ON category (user_id)');
        $this->addSql('ALTER TABLE answer ADD question_id INT DEFAULT NULL, ADD interviewed_id INT NOT NULL');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A251E27F6BF FOREIGN KEY (question_id) REFERENCES question (id)');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A25C74D1AB FOREIGN KEY (interviewed_id) REFERENCES interviewed (id)');
        $this->addSql('CREATE INDEX IDX_DADD4A251E27F6BF ON answer (question_id)');
        $this->addSql('CREATE INDEX IDX_DADD4A25C74D1AB ON answer (interviewed_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE interview_tag');
        $this->addSql('DROP TABLE interview_interviewed');
        $this->addSql('DROP TABLE interview_user');
        $this->addSql('DROP TABLE category_interview');
        $this->addSql('DROP TABLE interviewed_structure');
        $this->addSql('DROP TABLE structure_user');
        $this->addSql('ALTER TABLE answer DROP FOREIGN KEY FK_DADD4A251E27F6BF');
        $this->addSql('ALTER TABLE answer DROP FOREIGN KEY FK_DADD4A25C74D1AB');
        $this->addSql('DROP INDEX IDX_DADD4A251E27F6BF ON answer');
        $this->addSql('DROP INDEX IDX_DADD4A25C74D1AB ON answer');
        $this->addSql('ALTER TABLE answer DROP question_id, DROP interviewed_id');
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY FK_64C19C1A76ED395');
        $this->addSql('DROP INDEX IDX_64C19C1A76ED395 ON category');
        $this->addSql('ALTER TABLE category DROP user_id');
        $this->addSql('ALTER TABLE interview DROP FOREIGN KEY FK_CF1D3C34A76ED395');
        $this->addSql('DROP INDEX IDX_CF1D3C34A76ED395 ON interview');
        $this->addSql('ALTER TABLE interview DROP user_id');
        $this->addSql('ALTER TABLE question DROP FOREIGN KEY FK_B6F7494E55D69D95');
        $this->addSql('DROP INDEX IDX_B6F7494E55D69D95 ON question');
        $this->addSql('ALTER TABLE question DROP interview_id');
    }
}
