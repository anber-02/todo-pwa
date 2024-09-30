'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MoreVertical} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AddTask from './AddTask'

interface Task {
  id: number
  text: string
  startTime: string
  endTime: string
  status: 'todo' | 'in-progress' | 'completed'
  color: string
}

const statusColors = {
  'todo': 'bg-yellow-500',
  'in-progress': 'bg-blue-500',
  'completed': 'bg-green-500'
}

export function DarkTodoAppComponent() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])


  const updateTaskStatus = (id: number, status: 'todo' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status } : task
    ))
  }

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const completedPercentage = (tasks.filter(task => task.status === 'completed').length / tasks.length) * 100 || 0

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Hey, Welcome Bro</h1>
        <p className="text-gray-400">{currentDateTime.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
      </header>

      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search your Lists"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <AddTask setTasks={setTasks} tasks={tasks} />

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tareas para hoy</h2>
          <div className="flex items-center">
            <Progress value={completedPercentage} className="w-16 mr-2" />
            <span>{Math.round(completedPercentage)}%</span>
          </div>
        </div>

        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between bg-gray-700 rounded-lg p-3 mb-3"
          >
            <div className="flex items-center flex-grow">
              <div className={`w-1 h-12 ${task.color} rounded-full mr-3`}></div>
              <div className="flex-grow">
                <p className={task.status === 'completed' ? 'line-through text-gray-400' : ''}>{task.text}</p>
                <p className="text-sm text-gray-400">{task.startTime} - {task.endTime}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status]} text-white ml-2`}>
                {task.status}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-700 text-white">
                <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'todo')}>
                  Set to Todo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'in-progress')}>
                  Set to In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'completed')}>
                  Set to Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        ))} 
      </div>
    </div>
  )
}