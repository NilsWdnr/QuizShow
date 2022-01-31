<?php

namespace App\Interfaces;

use App\Models\Database;

abstract class BaseController {
    protected $db;

    public function __construct(){
        $this->db = new Database();
    }
}