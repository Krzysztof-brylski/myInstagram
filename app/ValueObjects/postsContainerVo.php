<?php
namespace App\ValueObjects;

class postsContainerVo{

    public $postContainer=array();

    public function __construct($postDtos){
        foreach ($postDtos as $postDto){
            $this->postContainer[$postDto->post_id]=$postDto;
        }
    }

    public function get(){
        return $this->postContainer;
    }
    public function getReverse(){
        return array_reverse($this->postContainer);
    }

}
