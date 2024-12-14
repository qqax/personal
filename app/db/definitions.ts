export type Biography = string[] | undefined;
export type Name = string;
export type Profession = string;
export type ArtistData = Name | Biography | Profession;

type ConcertID = {
    id: string;
};

type Concert = ConcertID & {
    id: string;
    date: Date;
    place: string;
    short_description?: string | null;
}

export type ConcertIDs = ConcertID[];
export type Concerts = Concert[];

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
