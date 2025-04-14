<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', auth()->id())->get();
        return response()->json($tasks);
    }

    public function show($id)
    {
        $task = Task::where('user_id', auth()->id())->findOrFail($id);
        return response()->json($task);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string'
        ]);

        $task = Task::create(array_merge(
            $request->all(),
            [
                'user_id' => auth()->id(),
                'completed' => false
            ]
        ));

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::where('user_id', auth()->id())->findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string'
        ]);

        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::where('user_id', auth()->id())->findOrFail($id);
        $task->delete();
        return response()->json(null, 204);
    }

    public function toggle($id)
    {
        $task = Task::where('user_id', auth()->id())->findOrFail($id);
        $task->completed = !$task->completed;
        $task->save();
        
        return response()->json($task);
    }
}
