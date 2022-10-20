<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    const MALE_DEFAULT_PHOTO="";
    const FEMALE_DEFAULT_PHOTO="";
    const NOSAY_DEFAULT_PHOTO="";

    protected $fillable = [
        'birth-day',
        'photo',
        'sex',
        'user_id',
    ];

    public function User(){
        return $this->belongsTo(User::class);
    }
    public function set_default_photo(){

        switch ($this->fillable['sex']){
            case "male":
                $this->fillable['photo']=self::MALE_DEFAULT_PHOTO;
                break;
            case "female":
                $this->fillable['photo']=self::FEMALE_DEFAULT_PHOTO;
                break;
            case "no-say":
                $this->fillable['photo']=self::NOSAY_DEFAULT_PHOTO;
                break;
        }
    }
    use HasFactory;
}
