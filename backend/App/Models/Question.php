<?php

namespace App\Models;

use App\Models\Database;

class Question {

  private $db;

  function __construct(){
    $this->db = new Database();
  }

  public function randomQuestion(){
      $randomId = rand(1, 35);

      $data = $this->db->select("questions","id",$randomId);
  
      return $data;
  }

}