import { Injectable } from '@angular/core';
import { Task } from '../task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompletedService {
  completedTasksChanged = new Subject<Task[]>()
  askToSaveCompleted= new Subject<Task>()
  askToDeleteCompleted = new Subject<string>()
  constructor() { }

  private tasks: Task[] = [];

  setTasks(tasks : Task[]) {
    for(let i=0; i<tasks.length; i++){
      if(!tasks[i].isCompleted){
        this.tasks.push(tasks[i])
      }
    }
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
    this.askToSaveCompleted.next(newTask);
  }
  deleteTask(index: number){
    const taskToDelete = this.tasks[index]
    this.tasks.splice(index, 1);
    this.completedTasksChanged.next(this.tasks.slice());
    this.askToDeleteCompleted.next(taskToDelete.id)
  }
}
