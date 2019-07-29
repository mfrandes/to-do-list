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
    this.http.put('https://task-project-35a94.firebaseio.com/tasks.json', tasks).subscribe(
      () =>{
        console.log(tasks);
        
      }
    )
  }
  fetchTasks(){
    return this.http.get<Task[]>('https://task-project-35a94.firebaseio.com/tasks.json')
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
