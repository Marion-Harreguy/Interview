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

       

        $name = $request->query->get("name");
        $interviewed = $request->query->get("interviewed");
        $tags = $request->query->get("tags");
        $openSource = $request->query->get("openSource");
      


        if ($request->query->get("title")) {
            $title = $request->query->get("title");
            //$interviews = $interviewRepository->findBy(["title" => $title]);
        } else {
            $title = '';
        }



        if ($request->query->get("date")) {
            $date = $request->query->get("date");   //1990 => Casse tout 
            //{1990}-01-01
        } else {
            $date = '';
        }


        if ($request->query->get("city") && $request->query->get("city") != null) {
            $city = $request->query->get("city"); // test : france => 7 resultats
            //$interviews = $interviewRepository->findBy(["location" => $city]);
        } else {
            $city = '';
        }



        if ($request->query->get("language") && $request->query->get("language") != null) {
            $language = $request->query->get("language"); // test : francais => 10 resultat
            //$interviews = $interviewRepository->findBy(["language" => $language]);
        } else {
            $language = '';
        }

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


            $interviews = $interviewRepository->findWithCrit($title, $date, $city, $language);
            
            // $date -> year 

      
        
//dd($interviews, $title, $date, $city, $language);





        //array $criteria, array $orderBy = null, $limit = null, $offset = null)
        // if ($city && $city != null) {
        //     $interviews = $interviewRepository->findBy(["location" => $city, "title" => ""], ["date" => "DESC"]);
        //  }else if ($title && $title != null) {
        //      $interviews = $interviewRepository->findBy(["title" => $title], ["date" => "DESC"]);
        //  } else {

        //     
        //  }
        $data = $serializer->normalize($interviews, null, ['groups' => ['browseInterviews']]);

        return $this->json(
            $data,
            $status = 200,
            $headers = ['content-type' => 'application/Json'],
            $context = []
        );
    }
}
