<?php

namespace App\Repositories;

use App\Models\Product;


class ProductRepository
{
    public function createMany(array $records)
    {
        $insertedProducts = [];
        
        foreach ($records as $record) {
            $insertedProducts[] = Product::create($record);
        }

        return $insertedProducts;
    }
}