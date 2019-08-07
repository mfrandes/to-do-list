import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TasksService } from '../services/tasks.service';
import { Task } from '../task.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private tsksService: TasksService) { }
  
  storeTasks(){
  const tasks:Task[]= this.tsksService.getTasks();
    this.http.post('hhttp://127.0.0.1:8080/api/task-actions', tasks).subscribe(
      () =>{
        console.log(tasks);
        
      }
    )
  }
  fetchTasks(){
    return this.http.get<Task[]>('hhttp://127.0.0.1:8080/api/task-actions')
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
