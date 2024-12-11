export type Biography = string[] | undefined;
export type Name = string;
export type Profession = string;
export type ArtistData = Name | Biography | Profession;

export type Concerts = {
    id: string;
    date: Date | null;
    place: string | null;
    // address: string | null;
    short_description?: string | null;
    // description?: string | null;
    // poster?: Buffer<ArrayBufferLike> | null;
    // link?: string | null;
    // record?: string | null;
}[];

export type ConcertsData = {
    concerts: Concerts;
    firstUpcomingConcertIndex: number;
};

export type ConcertDescription = {
    date: Date | null;
    place: string | null;
    address: string | null;
    description?: string | null;
    poster?: Buffer<ArrayBufferLike> | null;
    link?: string | null;
    recordsTable: {link: string, title: string} | null;
} | undefined;

// REVOKE DELETE, TRUNCATE ON public.artist FROM public;
