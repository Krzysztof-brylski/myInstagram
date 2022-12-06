<?php
namespace App\ValueObjects;

class commentsContainerVo{

    public $commentsContainer=array();

    public function __construct($array){
        foreach ($array as $commentsDto){
            array_push($this->commentsContainer,[
                "author"=>$commentsDto[0],
                "comment"=>$commentsDto[1],
            ]);
        }
    }

    public function get(){
        return $this->commentsContainer;
    }
    public function getReverse(){
        return array_reverse($this->commentsContainer);
    }

}

