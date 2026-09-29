import { EventsService } from './events.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    saveSubscription(dto: CreateSubscriptionDto): Promise<{
        message: string;
    }>;
}
