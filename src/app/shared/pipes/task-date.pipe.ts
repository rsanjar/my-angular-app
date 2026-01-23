import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'taskDate',
  standalone: true,
})
export class TaskDatePipe implements PipeTransform {
  transform(value: string | Date | undefined, format: string = 'MMMM d, y, h:mm a'): string {
    if (!value) {
      return '';
    }

    const date = typeof value === 'string' ? new Date(value) : value;

    return new DatePipe('en-US').transform(date, format) || '';
  }
}
