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
    private $potentialFutureFollowsIds=array();
    public function __construct(User $User){
        $this->User=$User;
        $table_name="user_follows_".$this->User->username;
        DB::table($table_name)->get("user_id")->each(function ($item){
            array_push($this->userFollowedIds,$item->user_id);
        });

    }
    private function getSuggestedUsersIds(){

        $popularUsers=User::query()->orderBy('followers_count','DESC')->limit(10)->get()->toArray();
        foreach ($popularUsers as $popularUser){
            array_push($this->potentialFutureFollowsIds,$popularUser["id"]);
        }

        foreach ($this->userFollowedIds as $id){
            $followedUser = User::find($id);
            $potentialFollowsTableName="user_follows_".$followedUser->username;
            DB::table($potentialFollowsTableName)->get("user_id")->each(function ($item){
                if(!in_array($item->user_id,$this->potentialFutureFollowsIds )){
                    array_push($this->potentialFutureFollowsIds,$item->user_id);
                }
            });

        }
    }

    private function buildSuggestedUserList(){
        $this->getSuggestedUsersIds();
        foreach ($this->potentialFutureFollowsIds as $id){
            if(!in_array($id, $this->userFollowedIds) and $id !== $this->User->id){
                array_push($this->suggestedUsers, new userDto(User::find($id)));
            }
        }
    }
    public function getSuggestedUsers(){
        $this->buildSuggestedUserList();
        return $this->suggestedUsers;
    }

}
