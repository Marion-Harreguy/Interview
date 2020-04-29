<?php

namespace App\Controller;

use App\Repository\InterviewRepository;
use App\Repository\TagRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


/**
 * @Route("/api/search", name="search_")
 */
class SearchController extends AbstractController
{
    /**
     * @Route("/", name="browse")
     * 
     * 
     * title
     * date
     * city
     * language
     * name
     * interviewed
     * tags
     * openSource
     * yearBegin
     * yearEnd
     * 
     * 
     */
    public function index(Request $request, InterviewRepository $interviewRepository, SerializerInterface $serializer, TagRepository $tagRepository)
    {

        $interviewResult = [];

        $name = $request->query->get("name");
        $interviewed = $request->query->get("interviewed");
        $tags = $request->query->get("tags");


        // on vérifie les donnée du parametre
        // on les stocke 
        if ($request->query->get("title")) {
            $title = $request->query->get("title");
        } else {
            $title = '';
        }
        // on vérifie les donnée du parametre
        // on les stocke 
        /*if ($request->query->get("date")) {
            $date = $request->query->get("date");  
        } else {
            $date = '';
        }*/
        // on vérifie les donnée du parametre
        // on les stocke 
        if ($request->query->get("city")) {
            $city = $request->query->get("city");
        } else {
            $city = '';
        }
        // on vérifie les donnée du parametre
        // on les stocke 
        if ($request->query->get("language")) {
            $language = $request->query->get("language");
        } else {
            $language = '';
        }
        // on vérifie les données du parametre
        // on les stocke 
        if ($request->query->get("openSource")) {
            $openSource = $request->query->get("openSource");
        } else {
            $openSource = '';
        }



        $yearBegin = $request->query->get("yearBegin");
        $yearEnd = strval($request->query->get("yearEnd") + 1);

        // if ($tags && $tags != null) {

        //     $tag = $tagRepository->findOneBy(["name" => $tags]);

        //   $critere["tags"] = $tag->getId();
        // }
        // if ($openSource && $openSource != null){
        //     $critere["openLicence"] = boolval($openSource);
        // }




        //dd($title, $date, $city, $language);

        // aucun param en get => 19 rel
        // unqiue param france => 2rel
        // unqiue param anglais => 6 rel
        // param lyon /anglais => 2rel 
        // pram titleprecis lyon/anglais => 1 rel
        // param date 2018 => 1 rel 
        // param date 2010 / francais /lyon => 1 rel
        if (
            $title
            //OR $date 
            or $city
            or $language
            or $openSource

        ) {

            if ( $openSource === true) {
              
                $interviewResult = $interviewRepository->findWithCrit($title, $city, $language, $openSource, $yearBegin, $yearEnd);
            } else {

                $interviewResult = $interviewRepository->findAllWithCrit($title, $city, $language, $yearBegin, $yearEnd);
            }



            //$interviewResult = $interviewRepository->findWithCrit($title, $city, $language, $openSource, $yearBegin, $yearEnd);
        } else {
            $interviewResult = $interviewRepository->findAllPublished();
        }







        //array $criteria, array $orderBy = null, $limit = null, $offset = null)
        // if ($city && $city != null) {
        //     $interviews = $interviewRepository->findBy(["location" => $city, "title" => ""], ["date" => "DESC"]);
        //  }else if ($title && $title != null) {
        //      $interviews = $interviewRepository->findBy(["title" => $title], ["date" => "DESC"]);
        //  } else {

        //     
        //  }
        $data = $serializer->normalize($interviewResult, null, ['groups' => ['browseInterviews']]);

        return $this->json(
            $data,
            $status = 200,
            $headers = ['content-type' => 'application/Json'],
            $context = []
        );
    }
}
