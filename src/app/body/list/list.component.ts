import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { Task } from 'src/app/shared/task.model';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  isAdmin = false;
  samallWindow = false;

  storageSub: Subscription;
  tskChangeSub: Subscription;
  taskSave: Subscription;
  taskUpdate: Subscription;
  taskDelete: Subscription;

  constructor(private tasksService: TasksService,
    private dataStorage: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.storageSub = this.dataStorage.fetchTasks().subscribe();
    this.tasks = this.tasksService.getTasks()
    this.tskChangeSub = this.tasksService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks
      }
    )
    this.taskSave = this.tasksService.savedTask.subscribe(
      task => {
        this.dataStorage.storeTask(task)
      }
    )
    this.taskUpdate = this.tasksService.savedTaskUpdate.subscribe(
      task => {
        this.dataStorage.updateTask(task)
      }
    )
    this.taskDelete = this.tasksService.askToDelete.subscribe(
      id => this.dataStorage.deleteTask(id)
    )

    this.authService.user.subscribe(
      user => {
        if (!user) {
          return
        }
        if (user.admin) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    )
  }
  onEditTask(index) {
    if (!this.isAdmin) {
      alert('Only Admin can perform this action!')
      return
    }
    this.tasksService.startedEditing.next(index)
  }
  onSendToCompleted(index: number) {
    const taskToSend = this.tasksService.getTask(index);
    taskToSend.isCompleted = true;
    this.tasksService.switchCompleted(index, taskToSend);
  }
  onDelete(index: number) {
    if (!this.isAdmin) {
      alert('Only Admin can perform this action!')
      return
    }
    const taskToDelete = this.tasksService.getTask(index)
    this.tasksService.deleteTask(index, taskToDelete)
  }
  ngOnDestroy() {
    this.tskChangeSub.unsubscribe();
    this.storageSub.unsubscribe();
    this.taskSave.unsubscribe();
    this.taskUpdate.unsubscribe();
    this.taskDelete.unsubscribe();
  }
}
