import { Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksService } from './services/tasks.service';
import { ITask } from './interfaces/task.interface';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TasksStateService } from './state/tasks-state.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'td-tasks',
  imports: [TaskListComponent, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  providers: [TasksService, TasksStateService]
})
export class TasksComponent implements OnInit, OnDestroy {
  private tasksStateService = inject(TasksStateService);
  private toastr = inject(ToastrService);

  public tasks: Signal<ITask[]> = this.tasksStateService.tasks;
  public taskTitle: WritableSignal<string> = signal<string>('');
  public isValid: Signal<boolean> = computed(() => this.taskTitle().trim().length > 0);

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.tasksStateService
      .getTasks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        error: (err) => this.toastr.error(err.error.message)
      });
  }

  onCreateTask(): void {
    const title = this.taskTitle().trim();
    if (!title) return;

    this.tasksStateService
      .createTask({ title })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (task) => {
          this.toastr.success('The task was created successfully!');
          this.tasksStateService.createTask(task);
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
    this.tasksStateService.setEditMode(id);
  }

  onUpdateTask(task: ITask): void {
    this.tasksStateService
      .updateTask(task)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.toastr.success('The task was updated successfully!');
          this.tasksStateService.updateTask(res);
        },
        error: (err) => this.toastr.error(err.error.message)
      });
  }

  onDeleteTask(id: string): void {
    this.tasksStateService
      .deleteTask(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.toastr.success('The task was successfully deleted!');
          this.tasksStateService.deleteTask(id);
        },
        error: (err) => this.toastr.error(err.error.message)
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
