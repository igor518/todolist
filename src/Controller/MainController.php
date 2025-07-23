<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'main_index')]
    public function index(): Response
    {
        if ($this->getUser()) {
            $fullName = $this->getUser()->getFirstName() . '-' . $this->getUser()->getLastName();
            return $this->redirectToRoute('main_with_user', ['fullName' => $fullName]);
        }

        return $this->render('main/homepage.html.twig');
    }

    #[Route('/{fullName}', name: 'main_with_user')]
    public function indexWithUser(): Response
    {
        return $this->render('main/homepage.html.twig');
    }
}
