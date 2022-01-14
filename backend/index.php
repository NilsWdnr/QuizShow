<?php

header('Access-Control-Allow-Origin:*'); 
header('Access-Control-Allow-Headers:X-Request-With');

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

error_reporting(E_ALL);
ini_set("display_errors","1");

require __DIR__ . '/vendor/autoload.php';
require_once("./Router.php");
