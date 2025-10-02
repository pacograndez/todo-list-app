import { Component, computed, input, Input, InputSignal, OnChanges, OnInit, output, Output, OutputEmitterRef, Signal, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ITask } from '../interfaces/task.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'td-task-list',
  imports: [NgbPaginationModule, FormsModule ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  
  public tasks: InputSignal<ITask[]> = input<ITask[]>([]);
  public page: WritableSignal<number>  = signal(1);
	public pageSize: Signal<number> = signal(5);
  public updateTask: OutputEmitterRef<ITask> = output<ITask>();
  public editTask: OutputEmitterRef<string> = output<string>();
  public deleteTask: OutputEmitterRef<string> = output<string>();

  public currentTasks: Signal<ITask[]> = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.tasks().slice(start, end)
  });

  public collectionSize: Signal<number> = computed(() => this.tasks().length);


  constructor() {	}

  onPageChange(): void {
    const start = (this.page() - 1) * this.pageSize();
    const end = start + this.pageSize();
    this.currentTasks = computed(() => this.tasks().slice(start, end));
  }

  onUpdate(task: ITask): void {
    this.updateTask.emit(task);
  }

  onEdit(task: ITask): void {
    this.editTask.emit(task.id);
  }

  onDelete(task: ITask): void {
    this.deleteTask.emit(task.id);
  }
}
