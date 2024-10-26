<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CsvImportService
{
    protected $requiredHeaders = ['name', 'sku', 'description', 'price'];

    public function validateHeaders(array $headers): void
    {
        $missingHeaders = array_diff(
            $this->requiredHeaders, 
            array_map('strtolower', $headers)
        );

        if (!empty($missingHeaders)) {
            throw ValidationException::withMessages([
                'headers' => 'Missing required columns: ' . implode(', ', $missingHeaders)
            ]);
        }
    }

    public function parseRow(array $data, array $headerMap, int $rowNumber): array
    {
        $productData = [
            'name' => $data[$headerMap['name']] ?? '',
            'sku' => $data[$headerMap['sku']] ?? '',
            'description' => $data[$headerMap['description']] ?? '',
            'price' => $data[$headerMap['price']] ?? 0,
        ];

        $validator = Validator::make($productData, [
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:50|unique:products,sku',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages([
                'message' => "Validation failed at row {$rowNumber}",
                'errors' => $validator->errors()->toArray()
            ]);
        }

        return $productData;
    }

    public function processFile($file): array
    {
        $handle = fopen($file->getPathname(), 'r');
        $headers = fgetcsv($handle);
        
        $this->validateHeaders($headers);
        
        $headerMap = array_flip(array_map('strtolower', $headers));
        $products = [];
        $row = 1;

        while (($data = fgetcsv($handle)) !== false) {
            $row++;
            
            if (empty(array_filter($data))) {
                continue;
            }

            $products[] = $this->parseRow($data, $headerMap, $row);
        }

        fclose($handle);
        return $products;
    }
}