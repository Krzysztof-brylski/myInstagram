<?php
namespace App\ValueObjects;
use App\Dto\comment\commentDto;

/**
 * Value object for comments container
 * Class commentsContainerVo
 * @package App\ValueObjects
 */
class commentsContainerVo{
    // array of commentDto
    public $commentsContainer=array();

    /**
     * commentsContainerVo constructor.
     * @param $array
     */
    public function __construct($array){
        $this->commentsContainer=$array;
    }

    /**
     * return array of commentsDto
     * @return array
     */
    public function get(){
        return $this->commentsContainer;
    }

    /**
     * return reversed array of commentsDto
     * @return array
     */
    public function getReverse(){
        return array_reverse($this->commentsContainer);
    }

}

