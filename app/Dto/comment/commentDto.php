<?php
namespace App\Dto\comment;
use App\Dto\user\userDto;
use App\Dto\comment\commentContentDto;
use Illuminate\Support\Facades\Auth;

class commentDto{

    public $comment;
    public $author;

    public function __construct(userDto $author,commentContentDto $comment){
        $this->comment=$comment;
        $this->author=$author;
    }

}
