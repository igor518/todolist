<?php

declare(strict_types=1);

namespace App\GraphQL\Resolver;

class HelloResolver
{
    public function __invoke()
    {
        return "Hello, Symfony 7 with GraphQL!";
    }
}
