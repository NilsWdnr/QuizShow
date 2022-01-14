<?php

namespace App\Models;

use PDO;
use PDOException;

class Database {

    private $dbHost = "localhost:8889";
    private $dbName = "quizshow";
    private $dbUsername = "root";
    private $dbPassword = "root"; 
    private $pdo;

    public function __construct()
    { try{
        $this->pdo = new PDO(
            "mysql:host=" . $this->dbHost . ";dbname=" . $this->dbName, $this->dbUsername, $this->dbPassword
        );
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e){
            echo $e;
        }
    }

    public function select(string $table, string $identifier, $value){
        $selectQuery = $this->pdo->prepare("SELECT * FROM $table WHERE $identifier = ?");
        $selectQuery->execute([$value]);
        $results = $selectQuery->fetchAll(PDO::FETCH_ASSOC);
        if(isset($results[0])){
            return $results[0];
        } else {
            return false;
        }
    }

    public function insert(string $table,array $data){

        $columns = implode(",", array_keys($data));
        $values = array_values($data);
        $placeholders = $placeholders = rtrim(str_repeat("?,", count($data)),",");

        $insertQuery = $this->pdo->prepare("INSERT INTO $table ($columns) VALUES ($placeholders)");
        return $insertQuery->execute($values);

    }

    public function update(string $table,string $targetField, string $newValue, string $identifier, $identifierValue){
        $updateQuery = $this->pdo->prepare("UPDATE $table SET $targetField = ? WHERE $identifier = ?");
        $updateQuery ->execute([$newValue,$identifierValue]);
    }
}