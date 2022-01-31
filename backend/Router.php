<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Exception\HttpNotFoundException;

$app = AppFactory::create();
// $app->setBasePath('php-api'); // Subdirectory angeben

// Parse Json - Form Data und XML 
$app->addBodyParsingMiddleware();

// http://www.slimframework.com/docs/v4/cookbook/enable-cors.html


$app->options('/backend/{routes:.+}', function ($request, $response, $args) {
  return $response;
});

// Cors Settings
/*
$app->add(function ($request, $handler) {
  $response = $handler->handle($request);
  return $response->withHeader('Access-Control-Allow-Origin', '*')
  ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
  ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
}); */

$app->any('/', function (Request $request, Response $response) {
  $payload = json_encode("Du musst einen Model sowie eine Methode angeben");
  $response->getBody()->write($payload);
  return $response;
});

$app->post('/ready', function (Request $request, Response $response) {
  $response->getBody()->write("Hallo");
  return $response;
});

$app->any('/{model}', function (Request $request, Response $response) {
  $payload = json_encode("Du musst einen Model sowie eine Methode angeben");
  $response->getBody()->write($payload);
  return $response;
});

$app->get('/{model}/{method}', function (Request $request, Response $response, array $args) {
  $requestedModel = ucfirst($args["model"]);
  $requestedMethod = $args["method"];

  $model = "App\Models\\" . $requestedModel;

  if(!validateRoute($model,$requestedMethod)){
    $payload = "Die von dir angegebene Route ist ungueltig";
  } else {
    
    require_once('./App/Models/'.$requestedModel.".php");

    $model = new $model;
    $payload = $model->{$requestedMethod}();
  }

  
  $payload = json_encode($payload);
  $response->getBody()->write($payload, JSON_PRETTY_PRINT);
  return $response;
});

$app->get('/{model}/{method}/{param}', function (Request $request, Response $response, array $args) {
  $requestedModel = ucfirst($args["model"]);
  $requestedMethod = $args["method"];
  $requestedParam = $args["param"];

  $model = "App\\Models\\" . $requestedModel;

  if(!validateRoute($model,$requestedMethod)){
    $payload = "Die von dir angegebene Route ist ungueltig";
  } else {
    
    require_once('./App/Models/'.$requestedModel.".php");

    $model = new $model;
    $payload = $model->{$requestedMethod}($requestedParam);
  }

  $payload = json_encode($payload, JSON_PRETTY_PRINT);
  $response->getBody()->write($payload);
  return $response;
});

$app->post('/{model}/{method}', function (Request $request, Response $response, array $args) {


  $requestedModel = ucfirst($args["model"]);
  $requestedMethod = $args["method"];

  $data = json_decode($request->getBody(), true);

  $model = "App\\Models\\" . $requestedModel;

  if(!validateRoute($model,$requestedMethod)){
    $payload = "Die von dir angegebene Route ist ungueltig";
  } else {
    
    require_once('./App/Models/'.$requestedModel.".php");

    $model = new $model;
    $payload = $model->{$requestedMethod}($data);
  }

  $payload = json_encode($payload, JSON_PRETTY_PRINT);
  $response->getBody()->write($payload);

  return $response;
});

$app->post('/{model}/{methode}/{parameter}', function (Request $request, Response $response) {
  $payload = json_encode("Die von dir angegene Route enhaelt zu viele Parameter. Bitte gib bei POST Anfragen lediglich Model sowie Methode in der URL an");
  $response->getBody()->write($payload);
  return $response;
});

$app->any('/{model}/{methode}/{parameter}/{params:.*}', function (Request $request, Response $response) {
  $payload = json_encode("Deie von dir angegene Route enhaelt zu viele Parameter");
  $response->getBody()->write($payload);
  return $response;
});

function validateRoute(string $model, string $method){
  if(!class_exists($model)||!method_exists($model,$method)){
    return false;
  }

  return true;
}

$app->run();

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
  throw new HttpNotFoundException($request);
});
