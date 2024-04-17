import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent  {
  tasks: { name: string; description: string; dueDate: string; isCompleted: boolean }[] = [];
  taskName = '';
  taskDesc = '';
  taskDate = '';
  isEditingTaskIndex: number | null = null;

  addTask() {
    if (this.taskName.trim() === '' || this.taskDate.trim() === '') {
      return; 
    }

    if (this.isEditingTaskIndex !== null) {
      const editedTask = this.tasks[this.isEditingTaskIndex];
      editedTask.name = this.taskName;
      editedTask.description = this.taskDesc;
      editedTask.dueDate = this.taskDate;
      this.isEditingTaskIndex = null;
    } else {
      this.tasks.push({
        name: this.taskName,
        description: this.taskDesc,
        dueDate: this.taskDate,
        isCompleted: false
      });
    }

    this.resetForm();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  editTask(index: number) {
    this.isEditingTaskIndex = index;
    const editedTask = this.tasks[index];
    this.taskName = editedTask.name;
    this.taskDesc = editedTask.description;
    this.taskDate = editedTask.dueDate;
  }

  saveOrCancelEdit() {
    if (this.isEditingTaskIndex !== null) {
      this.addTask();
    } else {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.isEditingTaskIndex = null;
    this.resetForm();
  }

  resetForm() {
    this.taskName = '';
    this.taskDesc = '';
    this.taskDate = '';
  }

  toggleCompletion(index: number) {
    this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
  }
}
