import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient);

  constructor() { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${environment.urlApi}/tasks`).pipe(
      map(tasks => tasks.map(task => ({
        id: task.id,
        title: task.title,
        isReadOnly: true,
        completed: task.completed,
        userId: task.userId
      })))
    );
  }

  createTask(task: Partial<ITask>): Observable<ITask> {
    return this.http.post<ITask>(`${environment.urlApi}/tasks`, task).pipe(
      map(task => ({
        id: task.id,
        title: task.title,
        isReadOnly: true,
        completed: false,
        userId: task.userId
      }))
    );
  }

  updateTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${environment.urlApi}/tasks/${task.id}`, {title: task.title, completed: task.completed}).pipe(
      map(task => ({
        id: task.id,
        title: task.title,
        isReadOnly: true,
        completed: task.completed,
        userId: task.userId
      }))
    );
  }

  deleteTask(idTask: string): Observable<ITask> {
    return this.http.delete<ITask>(`${environment.urlApi}/tasks/${idTask}`);
  }
}
