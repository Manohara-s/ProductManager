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


    public static function getProducts(){
        return Product::all();
    }

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

    public static function updateProduct(Request $request){
        $request->validate(self::$validator);

        $product = Product::findOrFail($request->id);

        // if($product->isEmpty()){
        //     throw new Exception('Unable to find Product');
        // }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->qty = $request->qty;

        $product->update();

        return $product;
    }

    public static function deleteProduct(Product $product) {
        $product->delete();
    }

}