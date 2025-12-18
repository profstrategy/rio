export interface Tweet {
    id: string;
    text: string;
    entities: {
        hashtags: { tag: string }[];
        // mentions?: { username: string }[];
    };
}