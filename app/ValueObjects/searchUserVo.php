<?php
namespace App\ValueObjects;
use App\Models\User;
class searchUserVo{
    private $result=array();

    public function __construct($userVoArray)
    {
        foreach ($userVoArray as $userVp){
            $this->result[$userVp->id]=$userVp;
        }
    }

    public function get_data(){
        return $this->result;
    }
}
