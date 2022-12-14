<?php

namespace App\Suggesting;



use App\Dto\user\userDto;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SuggestingUsers{

    private $SuggestUsers=array();

    private $User;
    private $userFollowedIds=array();
    private $suggestedUsers=array();
    public function __construct(User $User){
        $this->User=$User;
        $table_name="user_follows_".$this->User->username;
        $this->userFollowedIds=DB::table($table_name)->get();

    }
    private function freshUserFollowedIds(){
        $table_name="user_follows_".$this->User->username;
        return DB::table($table_name)->get();
    }
    private function getSuggestedUsersIds(){
        $potentialFutureFollowsIds=array();

        foreach ($this->userFollowedIds as $id){
            $followedUser = User::find($id->user_id);
            $potentialFollowsTableName="user_follows_".$followedUser->username;
            array_push($potentialFutureFollowsIds,DB::table($potentialFollowsTableName)->get()->toArray());
        }
        return $potentialFutureFollowsIds;
    }

    private function buildSuggestedUserList(){
        $potentialFutureFollowsIds=$this->getSuggestedUsersIds();
        foreach ($potentialFutureFollowsIds as $ids){
            foreach ($ids as $id){
                if(!$this->freshUserFollowedIds()->has(["user_id"=>$id->user_id]) ){
                    array_push($this->suggestedUsers, new userDto(User::find($id->user_id)));
                }
            }
        }
    }
    public function getSuggestedUsers(){
        $this->buildSuggestedUserList();
        return $this->suggestedUsers;
    }

}
