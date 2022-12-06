<?php
namespace App\Dto\user;
use App\Models\User;

class userDto{

    public $id;
    public $name;
    public $username;
    public $image;

    public function __construct(User $user)
    {
        $this->id = $user->id;
        $this->name = $user->name;
        $this->username = $user->username;
        $this->image = $user->Info->photo;
    }


};
