<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InterviewedRepository")
 */
class Interviewed
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("interviewed")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=55)
     * @Groups("interviewed")
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=55)
     * @Groups("interviewed")
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups("interviewed")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("interviewed")
     */
    private $job;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups("interviewed")
     */
    private $city;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Interview", mappedBy="interviewed")
     */
    private $interviews;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Structure", inversedBy="intervieweds")
     */
    private $structure;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->interviews = new ArrayCollection();
        $this->structure = new ArrayCollection();
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

    public function getJob(): ?string
    {
        return $this->job;
    }

    public function setJob(?string $job): self
    {
        $this->job = $job;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

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
            $interview->addInterviewed($this);
        }

        return $this;
    }

    public function removeInterview(Interview $interview): self
    {
        if ($this->interviews->contains($interview)) {
            $this->interviews->removeElement($interview);
            $interview->removeInterviewed($this);
        }

        return $this;
    }

    /**
     * @return Collection|Structure[]
     */
    public function getStructure(): Collection
    {
        return $this->structure;
    }

    public function addStructure(Structure $structure): self
    {
        if (!$this->structure->contains($structure)) {
            $this->structure[] = $structure;
        }

        return $this;
    }

    public function removeStructure(Structure $structure): self
    {
        if ($this->structure->contains($structure)) {
            $this->structure->removeElement($structure);
        }

        return $this;
    }

    public function getCompleteName()
    {
        return $this->getFirstname() . ' ' . $this->getLastname();
    }

    /**
     * Fonction permettant de récupérer les initiales d'un interviewé
     */
    public function getInitials()
    {
        
         $words = explode(" ", $this->getCompleteName());
               
         $initials = "";

         foreach ($words as $w) {
           $initials .= $w[0];
         }

        return $initials;
    }

    /**
     * @Groups("browseInterviewed")
     */
    /*public function getInterviewed()
    {
        $dataInterviewed = [
            "id" => $this->getId(),
            "firstname" => $this->getFirstname(),
            "lastname" => $this->getLastname(),
            "email" => $this->getEmail(),
            "job" => $this->getJob(),
            "city" => $this->getCity(),
        ];

        $interviews = [];

        foreach ($this->getInterviews() as $interview) {
            $dataInterviews = [
                "id" => $interview->getId(),
                "title"  => $interview->getTitle(),
                "openLicence" => $interview->getOpenLicence(),
                "author" => $interview->getUser()->getCompleteName(),
            ];

            $interviews[] = $dataInterviews;
        }

        $dataInterviewed["interviews"] = $interviews;

        $structures = [];

        foreach ($this->getStructure() as $structure) {
            $dataStructures = [
                "id" => $structure->getId(),
                "name" => $structure->getName(),
                "city" => $structure->getCity(),
                "sector" => $structure->getSector(),
            ];
            
            $structures[] = $dataStructures;
        }

        $dataInterviewed["structures"] = $structures;

        return $dataInterviewed;
    }*/
}
