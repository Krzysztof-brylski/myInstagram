<?php
namespace App\Dto\comment;
use App\Dto\user\userDto;
use App\Dto\comment\commentContentDto;


/**
 * Class commentDto
 * DTO for comment, author and comment content
 * @package App\Dto\comment
 */
class commentDto{

    public $comment;
    public $author;

    /**
     * commentDto constructor.
     * @param userDto $author
     * @param commentContentDto $comment
     */
    public function __construct(userDto $author,commentContentDto $comment){
        $this->comment=$comment;
        $this->author=$author;
    }

}
