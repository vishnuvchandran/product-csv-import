<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportProductRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'file' => 'required|file|mimes:csv|max:2048'
        ];
    }

    public function messages()
    {
        return [
            'file.required' => 'Please select a file to import',
            'file.mimes' => 'The file must be a CSV file',
            'file.max' => 'The file size should not exceed 2MB'
        ];
    }
}
