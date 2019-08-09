import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../task.model';
import { map, tap } from 'rxjs/operators';
import { CompletedService } from '../services/completed.service';

@Injectable({
  providedIn: 'root'
})
export class CompletedStorageService {

  constructor(private http: HttpClient,
    private completedService: CompletedService) { }



  storeTask(task: Task) {
    this.http.post('http://127.0.0.1:8080/api/tasks', task).subscribe(
      () => {
        console.log(task);
      }
    )
  }
  deleteTask(id){
    this.http.delete('http://127.0.0.1:8080/api/tasks/'+ id, 
    ).subscribe(
      ()=> console.log('task deleted')  
    )
  }
  fetchTasks() {
    return this.http.get<Task[]>('http://127.0.0.1:8080/api/tasks')
      .pipe(map(tasks => {
        return tasks.map((task) => {
          return { ...task };
        })
      }),
        tap(tasks => {
         
        })
      )
  }
}

