<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function search_user(Request $request){

        $request->query('username') != null ? $name=$request->query('username'): $name=null;

        if($name !=null){
            $query=User::query();
            $result=$query->where('username','like',"$name%")
                ->orWhere('name','like',"$name%")->limit(15)->get();
            $json=array();
            foreach ($result as $user){
                if($user->info->public_status == false){
                    continue;
                }
                $json[$user->id]=[
                    'id'=>$user->id,
                    'name'=>$user->name,
                    'username'=> $user->username,
                    'img'=>$user->Info->photo
                ];
            }
            return Response()->json($json);
        }

        return Response()->json(null);
    }
}
