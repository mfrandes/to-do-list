import { Injectable } from '@angular/core';
import { Task } from '../task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksChanged = new Subject<Task[]>()
  completedTasksChanged = new Subject<Task[]>()
  startedEditing = new Subject<number>()

  savedTask = new Subject<Task>()
  savedTaskUpdate= new Subject<Task>()
  askToDelete = new Subject<string>()

  constructor() { }
  private tasks: Task[] = [];
  private completedTasks: Task[] = [];
  
  getTasks(){
    return this.tasks.slice();
  }
  getCompletedTasks(){
    return this.completedTasks.slice();
  }
  getTask(index:number) {
    return this.tasks[index];
  }
  getCompletedTask(index: number){
    return this.completedTasks[index];
  }

  saveNewTask(newTask: Task){
    this.tasks.push(newTask);
    this.tasksChanged.next(this.tasks.slice());
    this.savedTask.next(newTask)
  }
  
  setTasks(tasks : Task[]) {
    this.tasks = [];
    this.completedTasks = [];
    for(let i=0; i<tasks.length; i++){
      if(!tasks[i].isCompleted){
        this.tasks.push(tasks[i])
      }else if(tasks[i].isCompleted){
        this.completedTasks.push(tasks[i])
      }
    }
    this.tasksChanged.next(this.tasks.slice());
    this.completedTasksChanged.next(this.completedTasks.slice());
  }

  switchCompleted(index:number, task: Task){
    if(task.isCompleted === false){
      this.tasks.push(task);
      this.completedTasks.splice(index, 1);
    } else if(task.isCompleted === true){
      this.completedTasks.push(task);
      this.tasks.splice(index, 1);
    }
    this.tasksChanged.next(this.tasks.slice());
    this.completedTasksChanged.next(this.completedTasks.slice())
    this.savedTaskUpdate.next(task);
  }

  updateTask(index: number ,newTask: Task){
    if(!newTask.isCompleted){
      this.tasks[index] = newTask;
      this.tasksChanged.next(this.tasks.slice());
    } else if(newTask.isCompleted){
      this.completedTasks[index] = newTask
      this.completedTasksChanged.next(this.completedTasks.slice())
    }
    this.savedTaskUpdate.next(newTask);
    console.log('tasks ware changed' + newTask);
}
  deleteTask(index: number, taskToDel){
    if(!taskToDel.isCompleted){
      this.tasks.splice(index, 1);
      this.tasksChanged.next(this.tasks.slice());
    } else if(taskToDel.isCompleted){
      this.completedTasks.splice(index, 1);
      this.completedTasksChanged.next(this.completedTasks.slice())
    }    
    this.askToDelete.next(taskToDel.id);
  }
}
