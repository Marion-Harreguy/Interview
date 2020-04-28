<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InterviewRepository")
 */
class Interview
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("user")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=80)
     * @Groups("user")
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $context;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $location;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $language;

    /**
     * @ORM\Column(type="boolean")
     */
    private $openLicence;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isPublished;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Question", mappedBy="interview", orphanRemoval=true)
     */
    private $questions;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Tag", inversedBy="interviews")
     */
    private $tags;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="interviews")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Interviewed", inversedBy="interviews")
     */
    private $interviewed;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="favorite")
     */
    private $favorite;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $date;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $coordinates = [];

    

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->questions = new ArrayCollection();
        $this->tags = new ArrayCollection();
        $this->interviewed = new ArrayCollection();
        $this->favorite = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContext(): ?string
    {
        return $this->context;
    }

    public function setContext(string $context): self
    {
        $this->context = $context;

        return $this;
    }

    public function getlocation(): ?string
    {
        return $this->location;
    }

    public function setlocation(?string $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(string $language): self
    {
        $this->language = $language;

        return $this;
    }

    public function getOpenLicence(): ?bool
    {
        return $this->openLicence;
    }

    public function setOpenLicence(bool $openLicence): self
    {
        $this->openLicence = $openLicence;

        return $this;
    }

    public function getIsPublished(): ?bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished): self
    {
        $this->isPublished = $isPublished;

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
     * @return Collection|Question[]
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->setInterview($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->contains($question)) {
            $this->questions->removeElement($question);
            // set the owning side to null (unless already changed)
            if ($question->getInterview() === $this) {
                $question->setInterview(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Tag[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->contains($tag)) {
            $this->tags->removeElement($tag);
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Interviewed[]
     */
    public function getInterviewed(): Collection
    {
        return $this->interviewed;
    }

    public function addInterviewed(Interviewed $interviewed): self
    {
        if (!$this->interviewed->contains($interviewed)) {
            $this->interviewed[] = $interviewed;
        }

        return $this;
    }

    public function removeInterviewed(Interviewed $interviewed): self
    {
        if ($this->interviewed->contains($interviewed)) {
            $this->interviewed->removeElement($interviewed);
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getFavorite(): Collection
    {
        return $this->favorite;
    }

    public function addFavorite(User $favorite): self
    {
        if (!$this->favorite->contains($favorite)) {
            $this->favorite[] = $favorite;
        }

        return $this;
    }

    public function removeFavorite(User $favorite): self
    {
        if ($this->favorite->contains($favorite)) {
            $this->favorite->removeElement($favorite);
        }

        return $this;
    }


    public function getYear()
    {
        //2020
        $dateString = explode("-", $this->getDate());
               
        $year = $dateString[0];
     
       return $year;
    }

    public function theLastestDate()
    {
        $date = $this->getDate();

        if ($date === null) {
            return null;
        }


        return  $date;
    }

    /**
     * Get data list of Interviews (Browse)
     * @Groups("browseInterviews")
     */
    public function getMeta()
    {
        $interviews = [];

        // récupere uniquement les published = true => Repository
        $interview = [
            "id" => $this->getId(),
            "title"  => $this->getTitle(),
            "context" => $this->getContext(),
            "location" => $this->getlocation(),
            "language" => $this->getLanguage(),
            "openLicence" => $this->getOpenLicence(),
            "isPublished" => $this->getIsPublished(),
            "date" => $this->theLastestDate(),
            "coordinates" => $this->getCoordinates(),
            "interviewed" => $this->getInterviewed(),
            "tags" => $this->getTags(),
         
        ];

        $author = [];

        $author["id"] = $this->getUser()->getId();
        $author["firstname"] = $this->getUser()->getFirstname();
        $author["lastname"] = $this->getUser()->getLastname();
        $author["email"] = $this->getUser()->getEmail();
        $author["status"] = $this->getUser()->getStatus();


        $author["structure"] = $this->getUser()->getStructure();

        $interview["author"] = $author;


        $interviewedList = [];

        foreach ($this->getInterviewed() as $interviewed) {

            $dataInterviewed = [
                "id" => $interviewed->getId(),
                "firstname" => $interviewed->getFirstname(),
                "lastname" => $interviewed->getLastname(),
                "email" => $interviewed->getEmail(),
                "job" => $interviewed->getJob(),
            ];

            foreach ($interviewed->getStructure() as $structure) {
                $structure = [
                    "id" => $structure->getId(),
                    "name" => $structure->getName(),
                    "city" => $structure->getCity(),
                    "sector" => $structure->getSector(),
                ];
                $dataInterviewed["structure"] = $structure;
            }

            $interviewedList[] = $dataInterviewed;
        }

        $interview["interviewed"] = $interviewedList;

        $tagsList = [];

        foreach ($this->getTags() as $tags) {

            //$tags = [
            //    "name" => $tags->getName(),
            //];
            //$tagsList[] = $tags;
            $tagsList[] = $tags->getName();
        }

        $interview["tags"] = $tagsList;

        $interviews[] = $interview;
        return $interview;
    }



    public function getInterview()
    {


        $interview["meta"] = $this->getMeta();

        $questionList = [];
        $answerList = [];

        foreach ($this->getQuestions() as $questionObject) {

            $question = [
                "id" => $questionObject->getId(),
                "question" => $questionObject->getContent(),
            ];


            foreach ($questionObject->getAnswers() as $answerObject) {
                $answer = [
                    "id" => $answerObject->getId(),
                    "content" => $answerObject->getContent(),
                    "interviewed" => $answerObject->getInitials(),
                ];
                $answerList[] = $answer;
            }
            $question["answer"] = $answerList;

            $answerList = [];
            $questionList[] = $question;
            
        }
        $interview["content"] = $questionList;

        //dd($interview["content"]);
        return  $interview;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    public function getCoordinates(): ?array
    {
        return $this->coordinates;
    }

    public function setCoordinates(?array $coordinates): self
    {
        $this->coordinates = $coordinates;

        return $this;
    }

   
}
