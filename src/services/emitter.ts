import { EventEmitter } from 'eventemitter3'

const eventEmitter = new EventEmitter();

const Emitter = {
    on: (event: string | symbol, fn: (...args: any[]) => void) => eventEmitter.on(event, fn),
    once: (event: string | symbol, fn: (...args: any[]) => void) => eventEmitter.once(event, fn),
    off: (event: string | symbol, fn: (...args: any[]) => void) => eventEmitter.off(event, fn),
    emit: (event: string | symbol, ...args: any[]) => eventEmitter.emit(event, ...args),
    removeAll: (event: string | symbol) => {eventEmitter.removeAllListeners(event)}
}

Object.freeze(Emitter);

export default Emitter;