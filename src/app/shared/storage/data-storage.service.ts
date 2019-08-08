import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TasksService } from '../services/tasks.service';
import { Task } from '../task.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private tsksService: TasksService) { }
  
  /*storeTasks(){
  const tasks:Task[]= this.tsksService.getTasks();
    this.http.post('http://127.0.0.1:8080/api/task-actions', tasks).subscribe(
      () =>{
        console.log(tasks);
        
      }
    )
  }*/
  storeTask(task:Task){
    this.http.post('http://127.0.0.1:8080/api/tasks', task).subscribe(
      ()=>{
        console.log(task);
      }
    )
  }
  updateTask(task){
    const id = task.id
    this.http.patch('http://127.0.0.1:8080/api/tasks/'+id, task,
    
    ).subscribe(
      ()=> console.log('task updated'+id)  
    )
  }
  deleteTask(task){
    const id = task.id
    this.http.patch('http://127.0.0.1:8080/api/tasks/'+ id, task 
    ).subscribe(
      ()=> console.log('task updated')  
    )
  }
  fetchTasks(){
    return this.http.get<Task[]>('http://127.0.0.1:8080/api/tasks')
    .pipe(map(tasks => {
      return tasks.map((task) => {
          return {...task};
        })
    }),
      tap( tasks => {
       this.tsksService.setTasks(tasks)
    })
    )
  }

}
