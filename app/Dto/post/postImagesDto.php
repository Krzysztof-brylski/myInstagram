<?php
namespace App\Dto\post;
use App\Models\Post_images;

/**
 * Class postImagesDto
 * DTO for post images
 * @package App\Dto\post
 */
class postImagesDto{

    public $images = array();

    /**
     * postImagesDto constructor.
     * @param array $postImages
     */
    public function __construct(array $postImages){
        foreach($postImages as $image){
            array_push($this->images,$image->image_url);
        }
    }


}
