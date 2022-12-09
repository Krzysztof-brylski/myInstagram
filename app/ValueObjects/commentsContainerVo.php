<?php
namespace App\ValueObjects;
use App\Dto\comment\commentDto;
class commentsContainerVo{

    public $commentsContainer=array();

    public function __construct($array){
        $this->commentsContainer=$array;
    }

    public function get(){
        return $this->commentsContainer;
    }
    public function getReverse(){
        return array_reverse($this->commentsContainer);
    }

}

