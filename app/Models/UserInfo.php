<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{

    protected $fillable = [
        'birth_day',
        'photo',
        'user_id',
    ];

    public function User(){
        return $this->belongsTo(User::class);
    }

    use HasFactory;
}
