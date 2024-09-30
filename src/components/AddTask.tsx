import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface Task {
  id: number
  text: string
  startTime: string
  endTime: string
  status: 'todo' | 'in-progress' | 'completed'
  color: string
}

interface Props{
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  tasks: Task[]
}

export default function AddTask({setTasks, tasks }: Props){

  const [newTask, setNewTask] = useState('')
  const [newTaskStartTime, setNewTaskStartTime] = useState('')
  const [newTaskEndTime, setNewTaskEndTime] = useState('')


  const addTask = () => {
    if (newTask.trim() !== '' && newTaskStartTime !== '' && newTaskEndTime !== '') {
      const colors = ['bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-teal-500']
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        startTime: newTaskStartTime,
        endTime: newTaskEndTime,
        status: 'todo',
        color: colors[Math.floor(Math.random() * colors.length)]
      }])
      setNewTask('')
      setNewTaskStartTime('')
      setNewTaskEndTime('')
    }
  }

  return (
    <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary"  className="w-full mt-4 bg-slate-700 my-2 text-white">
              <Plus className="w-5 h-5 mr-2" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="task">Task</Label>
                <Input
                  id="task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter task description"
                  className="bg-gray-700 text-white"
                />
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newTaskStartTime}
                    onChange={(e) => setNewTaskStartTime(e.target.value)}
                    className="bg-gray-700 text-white"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newTaskEndTime}
                    onChange={(e) => setNewTaskEndTime(e.target.value)}
                    className="bg-gray-700 text-white"
                  />
                </div>
              </div>
              <Button onClick={addTask} className="w-full">Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
  )
}