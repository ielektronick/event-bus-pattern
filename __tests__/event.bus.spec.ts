import { EventBus, IEventBus } from '..';
import { EventBusEvent } from '../src';

describe('Event bus', () => {
  let eventBus: IEventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe and call event callbacks', () => {
    const mock: jest.Mock = jest.fn();
    eventBus.subscribe(EventBusEvent.Event1, mock);
    eventBus.post(EventBusEvent.Event1);
    expect(mock).toHaveBeenCalled();
  });

  it('should subscribe and call event callbacks with argumnets', () => {
    const mock: jest.Mock = jest.fn();
    eventBus.subscribe(EventBusEvent.Event1, mock);
    eventBus.post(EventBusEvent.Event1, 1, {});
    expect(mock).toHaveBeenCalledWith(1, {});
  });

  it('should unsubscribe event callbacks', () => {
    const mock: jest.Mock = jest.fn();
    eventBus.subscribe(EventBusEvent.Event1, mock);

    // Post 'event-1'.
    eventBus.post(EventBusEvent.Event1);
    expect(mock).toHaveBeenCalled();

    // Unsubscribe from 'event-1'.
    eventBus.unsubscribe(EventBusEvent.Event1, mock);
    mock.mockClear();

    // Post 'event-1' again.
    eventBus.post(EventBusEvent.Event1);
    expect(mock).not.toHaveBeenCalled();
  });
});
