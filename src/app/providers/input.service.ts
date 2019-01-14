import "hammerjs";

export class InputService {
    field;
    hamming;
    subscribers = {};
    events = {
        "move": "input.service.event.move"
    };

    init(field):void {
        this.field = field;
        this.hamming = new Hammer(this.field);
        this.hamming.get('swipe').set({
            direction: Hammer.DIRECTION_ALL
        });

        this.listen()
    }

    on(eventName, callback):void {
        if (!this.subscribers[eventName]) 
            this.subscribers[eventName] = [];
        
        this.subscribers[eventName].push(callback);
    }

    listen():void {
        this.hamming.on("swipe", (ev) => {
            this.emit(
                this.events.move,
                {
                    direction: ev.direction
                }
            )
        });
    }

    emit(eventName, data):void {
        if (
            this.subscribers[eventName] && 
            this.subscribers[eventName].length
        ) {
                this.subscribers[eventName].forEach(callback => callback(data));
        }
    }
}