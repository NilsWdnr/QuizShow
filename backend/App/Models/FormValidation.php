<?php

namespace App\Models;

use App\Models\Database;
use Exception;

class FormValidation {

    private $db;
    private $inputData;
    private $errors = [];
    private $rules;

    public function __construct(array $inputData){
        $this->db = new Database();
        $this->inputData = $inputData;
    }

    public function setRules(array $rules){
        $this->rules = $rules;
    }

    public function validate(){

        foreach($this->rules as $field => $fieldRules){
            $fieldRules = explode("|",$fieldRules);

            if(!in_array("required",$fieldRules)){
                if(!isset($this->inputData[$field])){
                    continue;
                }
            }

            $this->validateField($field, $fieldRules);
        }
        
    }

    private function validateField(string $field, array $fieldRules){
        usort($fieldRules, function($firstRule, $secondRule){
            if($firstRule === "required"){
                return -1;
            }

            return 1;
        });

        foreach($fieldRules as $fieldRule){
            $ruleSegments = explode(":",$fieldRule);

            $fieldRule = $ruleSegments[0];

            if(isset($ruleSegments[1])){
                $satisfier = $ruleSegments[1];
            } else {
                $satisfier = null;
            }

            try{
                $this->{"validate" . ucfirst($fieldRule)}($field, $satisfier);
            } catch (Exception $exception){
                $this->errors[$field] = $exception->getMessage();

                if($fieldRule === "required"){
                    break;
                }
            }

            
        }
    }

    private function validateRequired(string $field){
        if(!isset($this->inputData[$field]) || empty($this->inputData[$field])){
            throw new Exception("Dieses Feld muss ausgefüllt werden");
        }
    }

    private function validateAlnum(string $field){
        if(!ctype_alnum($this->inputData[$field])){
            throw new Exception("Dieses Feld darf nur Buchstaben und Zahlen beinhalten");
        }
    }

    private function validateMin(string $field, string $satisfier){
        if(strlen($this->inputData[$field]) < (int)$satisfier){
            throw new Exception("Dieses Feld muss mindestens $satisfier Zeichen beinhalten");

        }
    }

    private function validateMax(string $field, string $satisfier){
        if(strlen($this->inputData[$field]) > (int)$satisfier){
            throw new Exception("Dieses Feld darf maximal $satisfier Zeichen beinhalten");

        }
    }

    private function validateEmail(string $field){
        if(!filter_var($this->inputData[$field], FILTER_VALIDATE_EMAIL)){
            throw new Exception("Bitte gib eine gültige Email-Adresse an");
        }
    }

    private function validateMatches(string $field, string $satisfier){
        if($this->inputData[$field]!==$this->inputData[$satisfier]){
            throw new Exception("Deine Eingabe stimmt nicht mit dem Feld $satisfier überein");
        }
    }

    private function validateAvailable(string $field, string $satisfier){
        if($this->db->select($satisfier,$field,$this->inputData[$field])){
            throw new Exception(ucfirst($field) . " bereits vergeben");
        }
    }

    public function fails(){
        return count($this->errors) ? true : false;
    }

    public function getErrors(){
        return $this->errors;
    }

}