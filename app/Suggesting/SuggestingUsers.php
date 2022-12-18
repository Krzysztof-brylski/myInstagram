<?php

namespace App\Suggesting;



use App\Dto\user\userDto;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * Class SuggestingUsers
 * @package App\Suggesting
 */
class SuggestingUsers{

    // selected user to make suggesting list
    private $User;
    // array with ids of user followed by selected user
    private $userFollowedIds=array();
    //array of userDto with suggested to follow users
    private $suggestedUsers=array();
    // array with ids of  follows made by users followed by selected user
    private $potentialFutureFollowsIds=array();

    /**
     * SuggestingUsers constructor.
     * @param User $User
     */
    public function __construct(User $User){
        $this->User=$User;
        $table_name="user_follows_".$this->User->id;
        DB::table($table_name)->get("user_id")->each(function ($item){
            array_push($this->userFollowedIds,$item->user_id);
        });

    }

    /**
     * building  array of users ids suggester to follow,
     * by getting ids of  follows, followed users and mixing them with popular users
     */
    private function getSuggestedUsersIds(){

        $popularUsers=User::query()->orderBy('followers_count','DESC')->limit(10)->get()->toArray();

        foreach ($popularUsers as $popularUser){
            array_push($this->potentialFutureFollowsIds,$popularUser["id"]);
        }


        foreach ($this->userFollowedIds as $id){
            $followedUser = User::find($id);
            $potentialFollowsTableName="user_follows_".$followedUser->id;
            DB::table($potentialFollowsTableName)->get("user_id")->each(function ($item){
                if(!in_array($item->user_id,$this->potentialFutureFollowsIds )){
                    array_push($this->potentialFutureFollowsIds,$item->user_id);
                }
            });

        }
    }

    /**
     * building array of userDto with suggested to follow users
     * eliminating repeats, currently followed users and self.
     */
    private function buildSuggestedUserList(){
        $this->getSuggestedUsersIds();
        foreach ($this->potentialFutureFollowsIds as $id){
            if(!in_array($id, $this->userFollowedIds) and $id !== $this->User->id){
                array_push($this->suggestedUsers, new userDto(User::find($id)));
            }
        }
    }

    /**
     * returning array of userDto with suggested to follow users
     * @return array
     */
    public function getSuggestedUsers(){
        $this->buildSuggestedUserList();
        return $this->suggestedUsers;
    }

}
