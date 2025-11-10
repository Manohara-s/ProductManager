<?php 

namespace App\Http\Services;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class ProductService extends Service {

    private static $validator = [
        'name' => 'required',
        'description' => 'required',
        'price' => 'required|numeric',
        'qty' => 'required|numeric'
    ];

    public static function storeProduct(Request $request) {

        $request->validate(self::$validator);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'qty' => $request->qty
        ]);

        // if($product->isEmpty()){
        //     throw new Exception('Product Creation Failed');
        // }

        return $product;

    }

}