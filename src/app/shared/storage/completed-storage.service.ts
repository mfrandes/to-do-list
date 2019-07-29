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



  storeCompletedTasks() {
    const completedTasks: Task[] = this.completedService.getTasks();
    this.http.put('https://task-project-35a94.firebaseio.com/completed.json', completedTasks).subscribe(
      () => {
        console.log(completedTasks);

      }
    )
  }
  fetchTasks() {
    return this.http.get<Task[]>('https://task-project-35a94.firebaseio.com/completed.json')
      .pipe(map(tasks => {
        return tasks.map((task) => {
          return { ...task };
        })
      }),
        tap(tasks => {
          this.completedService.setTasks(tasks)
        })
      )
  }
}

