import { EventBusEvent } from '../enums/event-bus-event.enum';

export interface IEventBusCallback {
  callbacks: ((...args: any[]) => void)[];
  event: EventBusEvent;
}