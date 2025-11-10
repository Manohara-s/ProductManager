<?php

namespace App\Http\Controllers;

use Exception;

abstract class Controller
{
    public static function returnSuccess($message = null, $data = null) {
        $response = ['success' => $message ? $message : 'Successful.'];
        if ($data !== null) {
            $response['data'] = $data;
        }
        return redirect()->back()->with($response);
    }   

    public static function returnError(Exception $ex) {
        return redirect()->back()->withErrors($ex->getMessage());
    }
}
