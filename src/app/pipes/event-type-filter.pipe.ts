import { Pipe, PipeTransform } from '@angular/core';
import { IEventType } from '../domain/ievent-type';

@Pipe({
  name: 'eventTypeFilter'
})
export class EventTypeFilterPipe implements PipeTransform {

  transform(value: IEventType[], filterBy: string): IEventType[] {

    var filterValue: string = '';
    if (typeof filterBy === 'string') {
      console.log('es string');
      filterValue = filterBy.toLowerCase();
    }
    return value.filter(option => option.type.toLowerCase().includes(filterValue));
  }

}
