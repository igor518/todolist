<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TaskListRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TaskListRepository::class)]
#[ApiResource]
class TaskList
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner_id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updated_at = null;

    /**
     * @var Collection<int, TaskListUser>
     */
    #[ORM\OneToMany(targetEntity: TaskListUser::class, mappedBy: 'task_list')]
    private Collection $taskListUsers;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->taskListUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getOwnerId(): ?User
    {
        return $this->owner_id;
    }

    public function setOwnerId(User $owner_id): static
    {
        $this->owner_id = $owner_id;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    /**
     * @return Collection<int, TaskListUser>
     */
    public function getTaskListUsers(): Collection
    {
        return $this->taskListUsers;
    }

    public function addTaskListUser(TaskListUser $taskListUser): static
    {
        if (!$this->taskListUsers->contains($taskListUser)) {
            $this->taskListUsers->add($taskListUser);
            $taskListUser->setTaskList($this);
        }

        return $this;
    }

    public function removeTaskListUser(TaskListUser $taskListUser): static
    {
        if ($this->taskListUsers->removeElement($taskListUser)) {
            // set the owning side to null (unless already changed)
            if ($taskListUser->getTaskList() === $this) {
                $taskListUser->setTaskList(null);
            }
        }

        return $this;
    }
}
