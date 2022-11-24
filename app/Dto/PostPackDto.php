<?php

use App\Models\User;

class PostPackDto{
    private $Posts=array();
    function __construct(User $user){
        //get followed_acc arr
        //get post from followed arr

    } //build into working on front-end assoc arr


    function isEmpty(){
        return empty($this->Posts);
    }

    function getPostPac(){
        //return post pack
    }

}
