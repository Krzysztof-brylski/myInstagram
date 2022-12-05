<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

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
            'photo'=>'nullable|image',
        ];
    }
}
