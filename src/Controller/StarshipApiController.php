<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class StarshipApiController extends AbstractController
{
    #[Route('/api/starships')]
    public function getCollection(LoggerInterface $logger): Response
    {
        $logger->info('Starships get collection');
        $starships = [
            [
                "name" => "USS LeafyCruiser (NCC-0001)",
                "class" => "Garden",
                "captain" => "Jean-Luc Pickels",
                "status" => "taken over by 0"
            ]
        ];
        return $this->json($starships);
    }
}