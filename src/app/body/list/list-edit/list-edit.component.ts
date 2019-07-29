import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../tasks.service';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  @ViewChild('f', {static: false}) taskForm: NgForm;
  editMode = false;
  editedIndex: number;
  editedTask: Task;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.startedEditing.subscribe(
      (index: number) => {
        this.editedIndex = index;
        this.editMode = true;
        this.editedTask = this.tasksService.geTaskToEdit(this.editedIndex)
        this.taskForm.setValue({
          task: this.editedTask.taskName,
          detail: this.editedTask.taskDetails
        }) 
      }
      
    )
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const newTask = new Task(value.task, value.detail);
    this.tasksService.saveNewTask(newTask)
    console.log(newTask);
    
  }
}
