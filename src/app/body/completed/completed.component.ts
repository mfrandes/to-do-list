import { Component, OnInit } from '@angular/core';
import { CompletedService } from 'src/app/shared/services/completed.service';
import { Task } from 'src/app/shared/task.model';
import { CompletedStorageService } from 'src/app/shared/storage/completed-storage.service';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  completTasks: Task[];
  constructor(private completedService: CompletedService,
              private completedStorage: CompletedStorageService,
              private tasksService: TasksService) { }

  ngOnInit() {
    this.completedStorage.fetchTasks().subscribe()
    this.completTasks= this.completedService.getTasks()
    this.completedService.completedTasksChanged.subscribe(
      (tasks: Task[]) =>{
        this.completTasks = tasks;
        this.completedStorage.storeCompletedTasks();
      }
    )
  }
  onSendTasks(index: number){
    const taskToSend = this.completedService.geTask(index);
    this.tasksService.saveNewTask(taskToSend);
    this.onDelete(index);
  }
  onDelete(index: number){
    this.completedService.deleteTask(index);
  }
}
