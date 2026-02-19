type Ad<T> = {
    id?: string,
    title: string,
    description: string,
    price: number,
    brand: string,
    model: string,
    year: number,
    userId?: string,
    images: T[];
};

export type AdRequestType = Ad<File>;
export type AdResponeType = Ad<string>;