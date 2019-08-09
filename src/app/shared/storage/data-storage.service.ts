import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TasksService } from '../services/tasks.service';
import { Task } from '../task.model';
import { map, tap } from 'rxjs/operators';
import { CompletedService } from '../services/completed.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private tsksService: TasksService,
              private completedService: CompletedService) { }
  
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
  deleteTask(id){
    this.http.delete('http://127.0.0.1:8080/api/tasks/'+ id, 
    ).subscribe(
      ()=> console.log('task deleted')  
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
       this.completedService.setTasks(tasks)
    })
    )
  }

}
