export declare class CreateSubscriptionDto {
    userId: number;
    subscription: {
        endpoint: string;
        expirationTime: number | null;
        keys: {
            p256dh: string;
            auth: string;
        };
    };
}
