import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from 'src/app/shared/task.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tasks: Task[];
  constructor(private tasksService: TasksService,
              private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.dataStorage.fetchTasks().subscribe(() => console.log('data was fetched'));
    this.tasks = this.tasksService.getTasks()
    this.tasksService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks
        this.dataStorage.storeTasks()
      }
    )
  }
  onEditRecipe(index){
    this.tasksService.startedEditing.next(index)
  }

}
