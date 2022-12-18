<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * user info model
 * Class UserInfo
 * @package App\Models
 */
class UserInfo extends Model
{

    protected $fillable = [
        'birth_day',
        'photo',
        'public_status',
        'description',
        'user_id',
    ];
    //DB-relations
    public function User(){
        return $this->belongsTo(User::class);
    }

    use HasFactory;
}
