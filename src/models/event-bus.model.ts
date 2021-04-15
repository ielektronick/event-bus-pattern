import { EventBusEvent } from '../enums/event-bus-event.enum';

export interface IEventBus {
  /**
   * Posts an event type with specified parameters.
   * @param event One of events.
   * @param args Arguments to associate with event.
   */
  post(event: EventBusEvent, ...args: any[]): void;

  /**
   * Unsubscribes callback for specified event type(s).
   * @param event Event to unsubscribe callback. If array of events is specified callback will be unsubscribed for each events in array.
   * @param callback Callback to unsubscribe.
   */
  unsubscribe(event: EventBusEvent | EventBusEvent[], callback: (...args: any[]) => void): void;

  /**
   * Subscribes callback for specified event type(s).
   * @param event Event to subscribe callback. If array of events is specified callback will be subscribed for each events in array.
   * @param callback Callback to subscribe.
   */
  subscribe(event: EventBusEvent | EventBusEvent[], callback: (...args: any[]) => void): void;
}