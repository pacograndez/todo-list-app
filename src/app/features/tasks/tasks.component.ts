import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { TaskListComponent } from "./task-list/task-list.component";
import { TasksService } from './services/tasks.service';
import { ITask } from './interfaces/task.interface';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'td-tasks',
  imports: [TaskListComponent, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  private toastr = inject(ToastrService);
  public tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);
  public taskTitle: WritableSignal<string> = signal<string>('');
  public isValid: Signal<boolean> = computed(() => this.taskTitle().trim().length > 0);

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(res => this.tasks.set(res));
  }

  onCreateTask(): void {
    const title = this.taskTitle().trim();
    if (!title) return;

    this.tasksService.createTask({ title }).subscribe({
      next: (task) => {
        this.toastr.success('The task was created successfully!');
        this.tasks.update(tasks => [task, ...tasks])
        this.taskTitle.set('');
      },
      error: (err) => this.toastr.error(err.error.message)
    });
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.taskTitle.set(input.value);
  }

  onEditTask(id: string): void {
    this.tasks.update(tasks => tasks.map(task => task.id === id ? { ...task, isReadOnly: false } : task));
  }

  onUpdateTask(task: ITask): void {
    this.tasksService.updateTask(task).subscribe({
      next: (res) => {
        this.toastr.success('The task was updated successfully!');
        this.tasks.update(tasks => tasks.map(task => task.id === res.id ? res : task));
      },
      error: (err) => this.toastr.error(err.error.message)
    });
  }

  onDeleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe({
      next: () => {
        this.toastr.success('The task was successfully deleted!');
        this.tasks.update(tasks => tasks.filter(task => task.id !== id))
      },
      error: (err) => this.toastr.error(err.error.message)
    })
  }
}
