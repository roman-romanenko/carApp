type Ad<T> = {
    id?: string,
    title: string,
    description: string,
    price: number,
    brand: string,
    model: string,
    year: number,
    transmission: string,
    fuel: string,
    mileage: number,
    userId?: string,
    images: T[];
};

export type AdRequestType = Ad<File> & {
    zip: string,
    country: string,
    city: string,
};
export type AdResponeType = Ad<string> & {
    location: string
};