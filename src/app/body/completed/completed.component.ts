import { Component, OnInit } from '@angular/core';
import { CompletedService } from 'src/app/shared/services/completed.service';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from 'src/app/shared/services/tasks.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  completTasks: Task[];
  isAdmin = false;
  constructor(private completedService: CompletedService,
              private dataStorage: DataStorageService,
              private tasksService: TasksService,
              private authService: AuthService) { }

  ngOnInit() {
    this.dataStorage.fetchTasks().subscribe()
    this.completTasks= this.completedService.getTasks()
    this.completedService.completedTasksChanged.subscribe(
      (tasks: Task[]) =>{
        this.completTasks = tasks;
      }
    )
    this.completedService.askToSaveCompleted.subscribe(
      task => this.dataStorage.updateTask(task)
    )
    this.completedService.askToDeleteCompleted.subscribe(
      id => this.dataStorage.deleteTask(id)
    )
    this.authService.user.subscribe(
      user =>{
        if(!user){
          return
        }
        if(user.email === 'admin@test.com'){
          this.isAdmin = true;          
        } else {
          this.isAdmin = false;
        }
      }
    )
  }
  onSendTasks(index: number){
    const taskToSend = this.completedService.geTask(index);
    taskToSend.isCompleted = false;
    this.tasksService.saveNewTask(taskToSend);
  }
  onDelete(index: number){
    if(!this.isAdmin){
      alert('Only Admin can perform this action!')
      return
    }
    this.completedService.deleteTask(index);
  }
}
