import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../../shared/services/tasks.service';
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
        this.editedTask = this.tasksService.geTask(this.editedIndex)
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
    if(this.editMode){
      this.tasksService.updateTask(this.editedIndex, newTask)
    } else {
      this.tasksService.saveNewTask(newTask)
    }    
    this.onClear()
  }
  onClear() {
    this.taskForm.reset();
    this.editMode = false;
  }
}
