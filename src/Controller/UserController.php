<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Bundle\SecurityBundle\Security;

class UserController extends AbstractController
{
    #[Route('/login', name: 'user_login')]
    public function login(): Response
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        return $this->render('user/login.html.twig', ['form' => $form]);
    }

    #[Route('/register', name: 'user_register')]
    public function register(): Response
    {
        $user = new User();

        $form = $this->createForm(UserType::class, $user, [
            'action' => $this->generateUrl('user_save'),
            'method' => 'POST'
        ]);

        return $this->render('user/registration.html.twig', ['form' => $form]);
    }

    #[Route('user/save', name: 'user_save')]
    public function save(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $userPasswordHasher,
        Security $security
    ): Response {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $user->getEmail()]);
            if ($existingUser) {
                $this->addFlash('error', 'This email is already registered.');
                return $this->redirectToRoute('user_register');
            }
            $user = $form->getData();
            $user->setPassword($userPasswordHasher->hashPassword($user, $user->getPassword()));
            $entityManager->persist($user);
            $entityManager->flush();
            $security->login($user, 'form_login');
            return $this->redirectToRoute('app_dashboard');
        }
        return $this->render('user/registration.html.twig', ['form' => $form]);
    }
}
