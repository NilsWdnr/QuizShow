<?php

namespace App\Models;

use App\Models\FormValidation;
use App\Models\Database;

class User {

    private $db;
    private $id;
    private $username;
    private $passwordHashed;
    private $highscore;
    private $friends;
    private $erfahrungspunkte;

    public function __construct(){
        $this->db = new Database();   
    }

    private function find($identifierValue){

        if(is_int($identifierValue)){
            $identifier = "id";
        } else if(filter_var($identifierValue, FILTER_VALIDATE_EMAIL)){
            $identifier = "email";
        } else {
            $identifier = "username";
        }

        $user = $this->db->select("users",$identifier,$identifierValue);

        if($user!==false){
            $this->id = $user["id"];
            $this->username = $user["username"];
            $this->passwordHashed = $user["password"];
            $this->highscore = $user["highscore"];
            $this->erfahrungspunkte = $user["erfahrungspunkte"];
            return true;
        } else {
            return false;
        }

    }

    public function login(array $data){

        if(!isset($data["username"])||!isset($data["password"])){
            return "Etwas ist schief gelaufen, Benutzername und Passwort muessen per Post mitgeschickt werden";
        }

        $validation = new FormValidation($data);

        $validation->setRules([
            "username" => "required",
            "password" => "required"
        ]);

        $validation->validate();

        if($validation->fails()){
            return $validation->getErrors();
        } else {

            $usernameInput = $data["username"];
            $passwordInput = $data["password"];
    
            if(!$this->find($usernameInput)||!password_verify($passwordInput,$this->passwordHashed)){
                return ["login"=>"Username oder Passwort waren nicht korrekt"];
            } else {
                return ["success"=>true,"id"=>$this->id];
            }
            
        }

    }

    public function register(array $data){

        $validation = new FormValidation($data);

        $validation->setRules([
            "username" => "required|min:5|max:16|available:users",
            "email" => "required|email|available:users",
            "password" => "required|min:5",
            "password_repeat" => "required|matches:password"
        ]);

        $validation->validate();

        if($validation->fails()){
            return $validation->getErrors();
        } else {
            unset($data["password_repeat"]);
            $data["password"] = password_hash($data["password"], PASSWORD_DEFAULT);
            $data["highscore"] = 0;
            $data["erfahrungspunkte"] = 0;
            $this->db->insert("users",$data);

            $this->find($data["username"]);

            $returnData = [
                "success" => true,
                "id" => $this->id,
                "username" => $this->username,
            ];

            return $returnData;
            
        }
    }

    public function getHighscore(string $id){
        $id = (int)$id;
        $this->find($id);
        return($this->highscore);
    }

    public function setHighscore(array $data){
        $id = (int)$data["id"];
        $newHighscore = (int)$data["highscore"];

        $this->db->update("users","highscore",$newHighscore,"id",$id);
    }

    public function getExperiencePoints(string $id){
        $id = (int)$id;
        $this->find($id);
        return($this->erfahrungspunkte);
    }

    public function addExperience(array $data){

        $id = $data["id"];
        $previousEp = $this->getExperiencePoints($id);
        $id = (int)$id;
        $newEp = $previousEp + $data["ep"];

        return $this->db->update("users","erfahrungspunkte",$newEp,"id",$id);
    }


    public function getFriends(string $id){
        $id = (int)$id;
        $this->find($id);

        $friends = $this->friends;
        $friendsArray = explode(",",$friends);

        $friendsData = [];

        foreach ($friendsArray as $friendID) {
            $friendID = (int)$friendID;
            $this->find($friendID);

            $friend = [
                $id = $this->id,
                $username = $this->username,
                $erfahrungspunkte = $this->erfahrungspunkte
            ];

            array_push($friendsData,$friend);

        }

        return $friendsData;
    }

}