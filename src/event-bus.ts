import { EventBusEvent } from './enums';
import { IEventBus, IEventBusCallback } from './models';

export class EventBus implements IEventBus {
  private eventCallbacks: IEventBusCallback[] = [];

  public subscribe(event: EventBusEvent | EventBusEvent[], callback: (...args: any[]) => void) {
    if (Array.isArray(event)) {
      event.forEach((x: EventBusEvent) => { this.subscribe(x, callback); });
    } else {
      const eventCallback: IEventBusCallback | undefined = this.findEventBusCallback(event);
      if (eventCallback) {
        eventCallback.callbacks.push(callback);
      } else {
        this.eventCallbacks.push({ event, callbacks: [callback] });
      }
    }
  }

  public unsubscribe(event: EventBusEvent | EventBusEvent[], callback: (...args: any[]) => void) {
    if (Array.isArray(event)) {
      event.forEach((x: EventBusEvent) => this.unsubscribe(x, callback));
    } else {
      const eventCallback: IEventBusCallback | undefined = this.findEventBusCallback(event);
      if (!eventCallback) {
        console.warn(`Unable to unsubscribe ${callback} from ${event} event`);
        return;
      }

      const callbackIndex = eventCallback.callbacks.indexOf(callback);
      if (callbackIndex === -1) {
        console.warn(`Unable to unsubscribe ${callback} from '${event}' event.`);
        return;
      }

      eventCallback.callbacks.splice(callbackIndex, 1);
    }
  }

  public post(eventType: EventBusEvent, ...args: any[]) {
    const eventCallback: IEventBusCallback | undefined = this.findEventBusCallback(eventType);

    if (!eventCallback) {
      console.warn(`no subscribers for event ${eventType}`);
      return;
    }

    eventCallback.callbacks.forEach((callback) => callback.apply(null, args));
  }

  private findEventBusCallback(event: EventBusEvent): IEventBusCallback | undefined {
    return this.eventCallbacks
      .find((eventObject: IEventBusCallback) => eventObject.event === event);
  }
}
