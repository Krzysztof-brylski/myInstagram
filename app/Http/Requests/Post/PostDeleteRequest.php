<?php

namespace App\Http\Requests\post;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PostDeleteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $post=Post::find($this["post_id"]);
        return ($post->user_id == Auth::user()->id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "user_id"=>"required|exists:App\Models\User,id",
            "post_id"=>"required|exists:App\Models\Post,id",
        ];
    }
    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'user_id.required'=>"id użytkownika jest wymagane",
            'user_id.exists'=>"podany użytkownik nie istnieje",
            'post.required'=>"id postu jest wymagane",
            'post_id.exists'=>"podany post nie istnieje",
        ];
    }
}
