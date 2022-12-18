<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;
use function Symfony\Component\String\length;

/**
 * user model
 * Class User
 * @package App\Models
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'followers_count',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * get this user posts count
     * @return int
     */
    public function postCount(){
        return Post::query()->where('user_id','=',$this->id)->count();
    }

    /**
     * check if user have complete profile
     * @return bool
     */
    public function hasInfo(){
        return !is_null($this->Info);
    }

    /**
     * adding specified user to the this user follows list
     * @param $id
     * @return int
     */
    public function followUser($id){
        $db_name="user_follows_".$this->id;
        $targetUser=User::find($id);
        DB::table($db_name)->insert(['user_id'=>$id]);
        $targetUser->followers_count+=1;
        $targetUser->save();
        return  $targetUser->followers_count;
    }

    /**
     * removing specified user fromm this user follows list
     * @param $id
     * @return int
     */
    public function cancelFollowUser($id){
        $db_name="user_follows_".$this->id;
        $targetUser=User::find($id);
        DB::table($db_name)->where("user_id",'=',$id)->delete();
        $targetUser->followers_count-=1;
        $targetUser->save();
        return  $targetUser->followers_count;
    }

    /**
     * check if specified user is on this user follows list
     * @param $id
     * @return bool
     */
    public function isUserFollowed($id){
        $db_name="user_follows_".$this->id;
        return !DB::table($db_name)->where("user_id",'=',$id)->limit(1)->get()->isEmpty();
    }
    //DB-relations
    public function Info(){
        return $this->hasOne(UserInfo::class);
    }
}
