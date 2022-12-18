<?php

namespace App\Http\Requests\user;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

/**
 * validation for user update request
 * Class UserUpdateRequest
 * @package App\Http\Requests\user
 */
class UserUpdateRequest extends FormRequest
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
            'description'=>'nullable|max:150',
            'name'=>'nullable|max:30',
            'username'=>'nullable|unique:users,username|max:30',
            'email'=>'nullable|email|unique:users,email|max:40',
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
            //name
            'name.max'=>"Maksymalna długość pola to 30 znaków",
            //username
            'username.unique'=>"Ta nazwa urzytkownika jest już zajęta",
            'username.max'=>"Maksymalna długość pola to 30 znaków",
            //email
            'email.email'=>"Nieprawidłowy format emaila",
            'email.unique'=>"Ten email jest już zajęty",
            'email.max'=>"Maksymalna długość pola to 40 znaków",
        ];
    }

}
