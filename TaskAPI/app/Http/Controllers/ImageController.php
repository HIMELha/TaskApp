<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function uploadImage(Request $request){

        if($request->has('image')){
            $image = $request->file('image');

            $lastmod = now();
            $ext = $image->getClientOriginalExtension();
            
            $tempName = time() . rand(9999,100000) . '.' . $ext;

            $destination = public_path('uploads/');
            $image->move( $destination, $tempName);

            Image::create([
                'image' => $tempName,
                'last_modified' => $lastmod
            ]);
            return response()->json([
                'status' => true,
                'path' => asset('uploads/'.$tempName),
                'message' => 'Image uploaded successfully'
            ]);
        }else {
            return response()->json([
                'status' => false,
                'message' => 'Please select an image'
            ]);
        }

        
    }
}
