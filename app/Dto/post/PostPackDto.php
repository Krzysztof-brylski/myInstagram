<?php
namespace App\Dto\post;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use function Symfony\Component\String\length;

class PostPackDto{
    public $posts;
    public $pageSize;
    public $maxPages;

    public function __construct($posts, $pageSize,$maxPages){
        $this->posts=$posts;
        $this->pageSize=$pageSize;
        $this->maxPages=$maxPages;
    }
}
