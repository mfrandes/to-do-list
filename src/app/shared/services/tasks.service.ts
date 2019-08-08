import { Injectable } from '@angular/core';
import { Task } from '../task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksChanged = new Subject<Task[]>()
  savedTask = new Subject<Task>()
  savedTaskUpdate= new Subject<Task>()
  startedEditing = new Subject<number>()
  constructor() { }
  private tasks: Task[] = [];
 

  getTasks(){
    return this.tasks.slice();
  }
  saveNewTask(newTask: Task){
    this.tasks.push(newTask);
    this.tasksChanged.next(this.tasks.slice());
    this.savedTask.next(newTask)
  }
  setTasks(tasks : Task[]) {
    this.tasks = tasks;
    this.tasksChanged.next(this.tasks.slice());
  }
  geTask(index:number) {
    return this.tasks[index];
  }
  updateTask(newTask: Task){
    this.savedTaskUpdate.next(newTask)
    this.tasksChanged.next(this.tasks.slice());
    console.log('tasks ware changed' + newTask);
}
  deleteTask(index: number){
    this.tasks.splice(index, 1);
    this.tasksChanged.next(this.tasks.slice());
  }
}
