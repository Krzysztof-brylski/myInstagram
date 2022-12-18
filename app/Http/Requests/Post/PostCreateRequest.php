<?php

namespace App\Http\Requests\post;

use App\Models\Post;
use http\Env\Response;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

/**
 * validation for post create request
 * Class PostCreateRequest
 * @package App\Http\Requests\post
 */
class PostCreateRequest extends FormRequest
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
            "files"=>"required",
            "files.*"=>"file|image|dimensions:min_width=500,max_width=1000,min_height:500,max_height=1000|max:5000",
            "content"=>"required|max:200|string",
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
            //files
            'files.required'=>"Zdjęcia są wymagane",
            'files.*.image'=>"podane pliki muszą być zdjęciami",
            'files.*.dimensions'=>"Dopuszczalne wymiary to od 500x500 do 1000x1000 pikseli.",
            'file.max'=>"maksymalny rozmar pliku to 10mb",
            //content
            'content.required'=>"teść posta jest wymagana",
            'content.max'=>"maksymalna długość wpisu to 200 znaków",
            'content.string'=>"treść wpisu musi być znakami",

        ];
    }
    /**
     * Custom validation filed behaviour, response wth errors messages
     * @param Validator $validator
     * @throws ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $response= Response()->json($this->validator->errors()->messages(),500);
        throw (new ValidationException($validator, $response))
            ->errorBag($this->errorBag)
            ->redirectTo($this->getRedirectUrl());
    }
}
