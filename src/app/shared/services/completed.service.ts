import { Injectable } from '@angular/core';
import { Task } from '../task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompletedService {
  completedTasksChanged = new Subject<Task[]>()
  constructor() { }

  private tasks: Task[] = [];
  setTasks(tasks : Task[]) {
    this.tasks = tasks;
    this.completedTasksChanged.next(this.tasks.slice());
  }
  getTasks(){
    return this.tasks.slice();
  }
  geTask(index:number) {
    return this.tasks[index];
  }
  saveNewTask(newTask: Task){
    this.tasks.push(newTask);
    this.completedTasksChanged.next(this.tasks.slice());
  }
  deleteTask(index: number){
    this.tasks.splice(index, 1);
    this.completedTasksChanged.next(this.tasks.slice());
  }
}
