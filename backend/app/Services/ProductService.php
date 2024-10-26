<?php

namespace App\Services;

use App\Repositories\ProductRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;


class ProductService
{
    protected $repository;
    protected $csvImportService;

    public function __construct(
        ProductRepository $repository,
        CsvImportService $csvImportService
    ) {
        $this->repository = $repository;
        $this->csvImportService = $csvImportService;
    }

    public function importProducts(UploadedFile $file)
    {
        try {
            DB::beginTransaction();

            $products = $this->csvImportService->processFile($file);
            $this->repository->createMany($products);
            
            DB::commit();
            
            return [
                'success' => true,
                'message' => 'Successfully imported ' . count($products) . ' products',
                'imported_count' => count($products)
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}