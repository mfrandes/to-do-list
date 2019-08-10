import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from 'src/app/shared/services/tasks.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit, OnDestroy {
  completTasks: Task[];
  isAdmin = false;

  storageSub: Subscription;
  tskChangeSub: Subscription;
  taskDelete: Subscription;
  taskUpdate: Subscription

  constructor(private tasksService: TasksService,
              private authService: AuthService,
              private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.storageSub = this.dataStorage.fetchTasks().subscribe();
    this.completTasks = this.tasksService.getCompletedTasks()
    this.tskChangeSub = this.tasksService.completedTasksChanged.subscribe(
      (tasks: Task[]) =>{
        this.completTasks = tasks;
      }
    )
    this.taskDelete = this.tasksService.askToDelete.subscribe(
      id=> {
        this.dataStorage.deleteTask(id);
      }
    )
    this.taskUpdate= this.tasksService.savedTaskUpdate.subscribe(
      task => {
        this.dataStorage.updateTask(task)
      }
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
  onSendToTasks(index: number){
    const taskToSend = this.tasksService.getCompletedTask(index);
    taskToSend.isCompleted = false;
    this.tasksService.switchCompleted(index, taskToSend);
  }
  onDelete(index: number){
    if(!this.isAdmin){
      alert('Only Admin can perform this action!')
      return
    }
    const taskToDelete = this.tasksService.getCompletedTask(index)
    this.tasksService.deleteTask(index, taskToDelete);
  }
  ngOnDestroy() {
    this.tskChangeSub.unsubscribe();
    this.storageSub.unsubscribe();
    this.taskDelete.unsubscribe();
    this.taskUpdate.unsubscribe();
  }
}
