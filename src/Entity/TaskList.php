<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use App\Repository\TaskListRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\ApiFilter;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\GraphQl\Mutation;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\Metadata\GraphQl\DeleteMutation;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: TaskListRepository::class)]
#[ApiResource(graphQlOperations: [
    new Query(),
    new QueryCollection(),
    new Mutation(name: 'create'),
    new Mutation(name: 'update'),
    new DeleteMutation(name: 'delete')
])]
#[ApiFilter(SearchFilter::class, properties: ['owner' => 'exact'])]
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

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'taskLists')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner = null;

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

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): static
    {
        $this->owner = $owner;
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
