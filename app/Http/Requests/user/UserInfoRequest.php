<?php

namespace App\Http\Requests\user;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;

/**
 * validation for add user info request
 * Class UserInfoRequest
 * @package App\Http\Requests\user
 */
class UserInfoRequest extends FormRequest
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
        $after=date('Y-m-d', strtotime('-120 year'));
        $before=date('Y-m-d', strtotime('-12 year'));
        return [
            'birth_day'=>"required|date|after:$after|before:$before",
            'description'=>'required|max:150',
            'photo'=>'nullable|image|file|dimensions:min_width=200,max_width=250,min_height:200,max_height=250',
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
            //birth_day
            'birth_day.date'=>"Nieprawidłowy format daty",
            'birth_day.before'=>"Aby założyć konto musisz miec conajmniej 12 lat ",
            'birth_day.after'=>"Data po za maksymalnym zakresem",
            //description
            'description.required'=>"Pole jest wymagane",
            'description.max'=>"Maksymalna długość opisu to 150 znaków",
            //photo
            'photo.file'=>"To pole akceptuje tylko pliki",
            'photo.image'=>"Nieprawidłowy format zdjęcia",
            'photo.dimensions'=>"Zdjęcie profilowe musi mieć wymiary od 200x200 do 250x250 pikseli",
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
