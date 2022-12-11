<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\ValueObjects\searchUserVo;
use App\Dto\user\userDto;
class SearchController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function search_user(Request $request){

        $request->username != null ? $name=$request->username: $name=null;

        if($name !=null){
            $query=User::query();
            $result=$query->where('username','like',"$name%")
                ->orWhere('name','like',"$name%")->limit(15)->get();
            $usersArray=array();
            foreach ($result as $user){
                if($user->info->public_status == false){
                    continue;
                }
                array_push($usersArray,new userDto($user));
            }
            $resultVo= new searchUserVo($usersArray);
            return Response()->json($resultVo->get_data());
        }

        return Response()->json(null);
    }
}
