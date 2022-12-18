<?php

namespace App\Http\Requests\user;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

/**
 * validation for update user image request
 * Class UserUpdateImageRequest
 * @package App\Http\Requests\user
 */
class UserUpdateImageRequest extends FormRequest
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
            "newImage"=>"required|file|image|dimensions:min_width=200,max_width=250,min_height:200,max_height=250",
        ];
    }
    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return[
            'newImage.required'=>"Nowe zdjęcie profiliowe jest wymagane",
            'newImage.file'=>"To pole akceptuje tylko pliki",
            'newImage.image'=>"Nieprawidłowy format zdjęcia",
            'newImage.dimensions'=>"Zdjęcie profilowe musi mieć wymiary od 200x200 do 250x250 pikseli",
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
