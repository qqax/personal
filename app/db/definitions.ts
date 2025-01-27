export type Biography = string;
export type Name = string;
export type Profession = string;
export type ArtistData = Name | Biography | Profession;

type Concert = {
    id: string;
    date: Date;
    place: string;
    short_description?: string | null;
}

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
    poster?: Buffer | null;
    link?: string | null;
    recordsTable: { link: string, title: string } | null;
} | undefined;

export type RecordLinks = {
    date: Date | null;
    link: string | null;
    title: string | null;
    description: string | null;
    record_type: string | null;
}

export type Records = RecordLinks[];


// REVOKE DELETE, TRUNCATE ON public.artist FROM public;
