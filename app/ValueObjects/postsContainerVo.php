<?php
namespace App\ValueObjects;
/**
 * Value object for post container
 * Class postsContainerVo
 * @package App\ValueObjects
 */
class postsContainerVo{
    //array of postDto
    public $postContainer=array();

    /**
     * postsContainerVo constructor.
     * @param $postDtos
     */
    public function __construct($postDtos){
        foreach ($postDtos as $postDto){
            $this->postContainer[$postDto->post_id]=$postDto;
        }
    }
    /**
     * return array of postDto
     * @return array
     */
    public function get(){
        return $this->postContainer;
    }
    /**
     * return reversed array of postDto
     * @return array
     */
    public function getReverse(){
        return array_reverse($this->postContainer);
    }

}
