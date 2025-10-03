import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ITask } from '../interfaces/task.interface';
import { TasksService } from '../services/tasks.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TasksStateService {
  private readonly tasksService = inject(TasksService);
  private readonly tasksState: WritableSignal<ITask[]> = signal<ITask[]>([]);
  public readonly tasks: Signal<ITask[]> = this.tasksState.asReadonly();

  getTasks(): Observable<ITask[]> {
    return this.tasksService.getTasks().pipe(tap((tasks) => this.tasksState.set(tasks)));
  }

  createTask(task: Partial<ITask>): Observable<ITask> {
    return this.tasksService
      .createTask(task)
      .pipe(tap((newTask) => this.tasksState.update((tasks) => [newTask, ...tasks])));
  }

  updateTask(updateTask: ITask): Observable<ITask> {
    return this.tasksService
      .updateTask(updateTask)
      .pipe(
        tap((newTask) =>
          this.tasksState.update((tasks) => tasks.map((task) => (task.id === newTask.id ? newTask : task)))
        )
      );
  }

  deleteTask(id: string): Observable<ITask> {
    return this.tasksService
      .deleteTask(id)
      .pipe(tap(() => this.tasksState.update((tasks) => tasks.filter((task) => task.id !== id))));
  }

  setEditMode(id: string): void {
    this.tasksState.update((tasks) => tasks.map((task) => (task.id === id ? { ...task, isReadOnly: false } : task)));
  }
}
