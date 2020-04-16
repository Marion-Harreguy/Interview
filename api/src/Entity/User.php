<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="`user`")
 * @UniqueEntity(fields="email", message="Email already taken")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string user firstname
     * @ORM\Column(type="string", length=55)s
     * @Assert\NotBlank
     */
    private $firstname;

    /**
     * @var string user lastname
     * @ORM\Column(type="string", length=55)
     * @Assert\NotBlank
     */
    private $lastname;

    /**
     * @var string user email to authentificate
     * @ORM\Column(type="string", length=200, unique=true)
     * @Assert\Email
     */
    private $email;

    /**
     * @var string hashed password
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     */
    private $password;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var text user biography
     * @ORM\Column(type="text", nullable=true)
     */
    private $biography;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Category", mappedBy="user")
     */
    private $categories;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Interview", mappedBy="user")
     */
    private $interviews;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Interview", mappedBy="favorite")
     */
    private $favorite;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Structure", mappedBy="users")
     */
    private $structures;

    /**
     * @ORM\Column(type="string", unique=true, nullable=true)
     */
    private $apiToken;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->categories = new ArrayCollection();
        $this->interviews = new ArrayCollection();
        $this->favorite = new ArrayCollection();
        $this->structures = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }
    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getBiography(): ?string
    {
        return $this->biography;
    }

    public function setBiography(?string $biography): self
    {
        $this->biography = $biography;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
            $category->setUser($this);
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->contains($category)) {
            $this->categories->removeElement($category);
            // set the owning side to null (unless already changed)
            if ($category->getUser() === $this) {
                $category->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Interview[]
     */
    public function getInterviews(): Collection
    {
        return $this->interviews;
    }

    public function addInterview(Interview $interview): self
    {
        if (!$this->interviews->contains($interview)) {
            $this->interviews[] = $interview;
            $interview->setUser($this);
        }

        return $this;
    }

    public function removeInterview(Interview $interview): self
    {
        if ($this->interviews->contains($interview)) {
            $this->interviews->removeElement($interview);
            // set the owning side to null (unless already changed)
            if ($interview->getUser() === $this) {
                $interview->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Interview[]
     */
    public function getFavorite(): Collection
    {
        return $this->favorite;
    }

    public function addFavorite(Interview $favorite): self
    {
        if (!$this->favorite->contains($favorite)) {
            $this->favorite[] = $favorite;
            $favorite->addFavorite($this);
        }

        return $this;
    }

    public function removeFavorite(Interview $favorite): self
    {
        if ($this->favorite->contains($favorite)) {
            $this->favorite->removeElement($favorite);
            $favorite->removeFavorite($this);
        }

        return $this;
    }

    /**
     * @return Collection|Structure[]
     */
    public function getStructures(): Collection
    {
        return $this->structures;
    }

    public function addStructure(Structure $structure): self
    {
        if (!$this->structures->contains($structure)) {
            $this->structures[] = $structure;
            $structure->addUser($this);
        }

        return $this;
    }

    public function removeStructure(Structure $structure): self
    {
        if ($this->structures->contains($structure)) {
            $this->structures->removeElement($structure);
            $structure->removeUser($this);
        }

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * Données principales de l'objet User
     * @Groups("user")
     */
    public function getDataUser()
    {
        // on regroupe les metadonnées du user dans un tableau 
        $dataUser = [
            'id' => $this->getId(),
            'firstname' => $this->getFirstname(),
            'lastname' => $this->getLastname(),
            'email' => $this->getEmail(),
            'biograhy' => $this->getBiography(),
            'tokenApi' => $this->getApiToken(),
        ];

        return $dataUser;
    }

    /**
     * Données sur la structure
     * @Groups("user")
     */
    public function getDataStructure()
    {
        // on instancie un tableau de données de la structure
        $dataStructure = [];

        $structureList = [];
        // on regroupe les informations utiles 
        foreach ($this->getStructures() as $structure) {

            $structure = [
                'id' => $structure->getId(),
                'name' => $structure->getName(),
                'city' => $structure->getCity(),
                'sector' => $structure->getSector()
            ];
            $structureList[] = $structure;
        }

        // on injecte la liste des structures aux données de l'auteur 
        $dataStructure[] = $structureList;

        return $dataStructure;
    }
    /**
     * Données du dashboard de l'utilisateur
     * @Groups("user")
     */
    public function getDashboard()
    {
        // on instancie un tableau de données de la structure
        $dashboard = [];

        //on recupere les interviews 
        $interviewsPublishedListe = [];
        $interviewsWrittingListe = [];

        foreach ($this->getInterviews() as $interview) {


            if ($interview->getIsPublished() === true) {

                $interviewsPublished = [
                    'id' => $interview->getId(),
                    'title' => $interview->getTitle(),
                ];
                $interviewsPublishedListe[] = $interviewsPublished;
            } else {
                $interviewsWritting = [
                    'id' => $interview->getId(),
                    'title' => $interview->getTitle()
                ];
                $interviewsWrittingListe[]  = $interviewsWritting;
            }
        }

        //$dashboard["test"] = $categoriesList;
        $dashboard["publishedInterviews"] = $interviewsPublishedListe;
        $dashboard["writtingInterviews"] = $interviewsWrittingListe;

        //on recupere les interviews Favoris 
        $favoritesListe = [];
        foreach ($this->getFavorite() as $favorite) {
            $favorites = [
                'id' => $favorite->getId(),
                'title' => $favorite->getTitle()
            ];
            $favoritesListe[] = $favorites;
        }
        $dashboard["savedInterviews"] = $favoritesListe;

        // On recupere les catgories liées à l'utilisateur
        $categoriesList = [];
        // on regroupe les informations utiles 
        foreach ($this->getCategories() as $categories) {
            $category = [
                'id' => $categories->getId(),
                'name' => $categories->getName(),
                'interviews' => $categories->getInterviews()
            ];
            $categoriesList[] = $category;
        }
        $dashboard["categories"] = $categoriesList;


        return $dashboard;
    }

    /**
     * Get the value of apiToken
     */
    public function getApiToken()
    {
        return $this->apiToken;
    }

    /**
     * Set the value of apiToken
     *
     * @return  self
     */
    public function setApiToken($apiToken)
    {
        $this->apiToken = $apiToken;

        return $this;
    }
}
