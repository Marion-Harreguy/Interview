<?php

namespace App\Controller;

use App\Repository\InterviewRepository;
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
    public function index(Request $request, InterviewRepository $interviewRepository, SerializerInterface $serializer)
    {
        $title = $request->query->get("title");
        $date = $request->query->get("date");
        $city = $request->query->get("city");
        $language = $request->query->get("language");
        $name = $request->query->get("name");
        $interviewed = $request->query->get("interviewed");
        $tags = $request->query->get("tags");
        $openSource = $request->query->get("openSource");
        $yearBegin = $request->query->get("yearBegin");
        $yearEnd = $request->query->get("yearEnd");

        

        if ($city && $city != null) {
            $interviews = $interviewRepository->findBy(["location" => $city]);
        } else {
            $interviews = $interviewRepository->findAllPublished();
        }




        $data = $serializer->normalize($interviews, null, ['groups' => ['browseInterviews']]);

        return $this->json(
            $data,
            $status = 200,
            $headers = ['content-type' => 'application/Json'],
            $context = []
        );
    }
}
