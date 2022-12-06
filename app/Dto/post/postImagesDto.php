<?php
namespace App\Dto\post;
use App\Models\Post_images;

class postImagesDto{

    public $images = array();

    public function __construct($postImages){
        foreach($postImages as $image){
            array_push($this->images,$image->image_url);
        }
    }


}
