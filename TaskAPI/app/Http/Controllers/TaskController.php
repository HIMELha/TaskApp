<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function tasks($name = null){
        if($name){
            $tasks = Task::where('name', 'like', '%'.$name.'%')->get();
        }else{
            $tasks = Task::latest('id')->get();
        }
        
        return response()->json([
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'motivation' => 'required|max:255',
            'description' => 'required|max:800',
            'deadline' => 'required|date',
            'status' => 'required|in:"pending","proccessing","completed"'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ], 403);
        }
        Task::create([
            'name' =>  $request->name,
            'motivation' =>  $request->motivation,
            'description' =>  $request->description,
            'deadline' =>  $request->deadline,
            'status' =>  $request->status
        ]);

        return response()->json([
            'status' => true
        ],200);
    }

    public function edit($id){
        $task = Task::where('id',$id)->first();
        if(!$task){
            return response()->json([
                'status' => false
            ]);
        }
        return response()->json([
            'task' => $task
        ]);
    }

    public function update(Request $request, $id){

        $task = Task::where('id',$id)->first();

        if(!$task){
            return response()->json([
                'status' => false
            ]);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:tasks,name, '.$id.'|max:255',
            'motivation' => 'required|max:255',
            'description' => 'required|max:800',
            'deadline' => 'required|date',
            'status' => 'required|in:"pending","proccessing","completed"'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ], 403);
        }

        $task->update([
            'name' => $request->name,
            'motivation' => $request->motivation,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $request->status,
        ]);

        return response()->json([
            'status' => true
        ], 200);
    }

    public function delete($id){
        $task = Task::find($id);
        $task->delete();

        return response()->json([
            'status' => true
        ], 200);
    }


    public function show(){
        return view('welcome');
    }


    
}
