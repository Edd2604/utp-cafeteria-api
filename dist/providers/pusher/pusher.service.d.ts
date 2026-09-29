import Pusher from 'pusher';
export declare class PusherService {
    private readonly pusher;
    constructor(pusher: Pusher);
    trigger(channel: string, event: string, data: any): Promise<void>;
}
