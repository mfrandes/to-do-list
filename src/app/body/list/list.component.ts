import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { Task } from 'src/app/shared/task.model';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';
import { CompletedService } from 'src/app/shared/services/completed.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tasks: Task[];
  isAdmin = false;
  samallWindow = false;
  constructor(private tasksService: TasksService,
              private dataStorage: DataStorageService,
              private completeService: CompletedService,
              private authService: AuthService) { }

  ngOnInit() {
    this.dataStorage.fetchTasks().subscribe();
    this.tasks = this.tasksService.getTasks()
    this.tasksService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks
        this.dataStorage.storeTasks()
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
  onEditTask(index){
    if(!this.isAdmin){
      alert('Only Admin can perform this action!')
      return
    }
    this.tasksService.startedEditing.next(index)
  }
  onSendToCompleted(index: number){
    const taskToSend = this.tasksService.geTask(index);
    this.completeService.saveNewTask(taskToSend);
    this.onDelete(index);
  }
  onDelete(index: number){
    if(!this.isAdmin){
      alert('Only Admin can perform this action!')
      return
    }
    this.tasksService.deleteTask(index)
  }
}
