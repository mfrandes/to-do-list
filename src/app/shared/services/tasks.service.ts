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
  askToDelete = new Subject<string>()
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
    for(let i=0; i<tasks.length; i++){
      if(!tasks[i].isCompleted){
        this.tasks.push(tasks[i])
      }
    }
    this.tasksChanged.next(this.tasks.slice());
  }
  geTask(index:number) {
    return this.tasks[index];
  }
  updateTask(index: number ,newTask: Task){
    this.tasks[index] = newTask;
    this.savedTaskUpdate.next(newTask);
    this.savedTask.next(newTask);
    this.tasksChanged.next(this.tasks.slice());
    console.log('tasks ware changed' + newTask);
}
  deleteTask(index: number){
    const taskToDel = this.tasks[index];
    this.tasks.splice(index, 1);
    this.tasksChanged.next(this.tasks.slice());
    this.askToDelete.next(taskToDel.id);
  }
}
