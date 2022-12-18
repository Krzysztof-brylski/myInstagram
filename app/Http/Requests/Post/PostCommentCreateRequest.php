<?php

namespace App\Http\Requests\post;

use Illuminate\Foundation\Http\FormRequest;

/**
 * validation for create post comment request
 * Class PostCommentCreateRequest
 * @package App\Http\Requests\post
 */
class PostCommentCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'comment'=>"required|max:150|string",
            'post_id'=>"required|exists:App\Models\Post,id"
        ];
    }
    public function messages()
    {
        return [
            'comment.required'=>"treść komentarza jest wymagana",
            'comment.max'=>"podany komentarz jest za długi max 150 znaków",
            'comment.string'=>"komentarz musi być znakami",
            'post_id.required'=>"nie został podany post",
            'post_id.exists'=>"podany post nie istnieje",
        ];
    }
}
