<?php
namespace App\Dto\user;
use App\Models\User;

/**
 * Class userDto
 * DTO for user
 * @package App\Dto\user
 */
class userDto{

    public $id;
    public $name;
    public $username;
    public $image;

    /**
     * userDto constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->id = $user->id;
        $this->name = $user->name;
        $this->username = $user->username;
        $this->image = $user->Info->photo;
    }


};
