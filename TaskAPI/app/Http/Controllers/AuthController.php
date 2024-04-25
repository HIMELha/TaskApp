<?php

namespace App\Http\Controllers;

use App\Models\PersonalAccessToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response(['message' => __('auth.failed')], 422);
        }
        
        $token = auth()->user();
        return response()->json(['token' => $token]);

    }

    public function verifyLogin(Request $request){

        $token = $request->token;

        $user = User::where('email', $token)->first();

        if(!$user){
            return response()->json([
                'status' => false
            ], 422);
        }

        return response()->json([
            'status' => true,
            'user' => $user
        ], 200);
    }
}
