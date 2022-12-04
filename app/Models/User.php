<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;
use function Symfony\Component\String\length;

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

    public function postCount(){
        return Post::query()->where('user_id','=',$this->id)->count();
    }

    public function hasInfo(){
        return !is_null($this->Info);
    }

    public function followUser($id){
        $db_name="user_follows_".$this->username;
        $targetUser=User::find($id);
        DB::table($db_name)->insert(['user_id'=>$id]);
        $targetUser->followers_count+=1;
        $targetUser->save();
        return  $targetUser->followers_count;
    }
    public function cancelFollowUser($id){
        $db_name="user_follows_".$this->username;
        $targetUser=User::find($id);
        DB::table($db_name)->where("user_id",'=',$id)->delete();
        $targetUser->followers_count-=1;
        $targetUser->save();
        return  $targetUser->followers_count;
    }
    public function isUserFollowed($id){
        $db_name="user_follows_".$this->username;
        return !DB::table($db_name)->where("user_id",'=',$id)->limit(1)->get()->isEmpty();
    }

    public function Info(){
        return $this->hasOne(UserInfo::class);
    }
}
