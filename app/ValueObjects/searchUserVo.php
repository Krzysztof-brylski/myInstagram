<?php
namespace App\ValueObjects;
use App\Models\User;

/**
 * Value object for users
 * Class searchUserVo
 * @package App\ValueObjects
 */
class searchUserVo{
    //array of userDto
    private $result=array();

    /**
     * searchUserVo constructor.
     * @param $userVoArray
     */
    public function __construct($userVoArray)
    {
        foreach ($userVoArray as $userVp){
            $this->result[$userVp->id]=$userVp;
        }
    }

    /**
     * return array of userDto
     * @return array
     */
    public function get(){
        return $this->result;
    }
}
