import {
    CONTACT_TYPE_EMAIL,
    CONTACT_TYPE_PHONE,
    type recordService,
    type recordType,
    type socialType
} from "@/app/lib/schema/enums";

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
    records: { uuid: string, record_service: string }[] | null;
} | undefined;

export type Record = {
    date: Date | null;
    uuid: string | null;
    record_service: recordService | null;
    record_type: recordType | null;
    short_description: string | null;
    description: string | null;
}

export type Records = Record[];

export type Socials = { url: string, type: socialType | null }[];
export type Contacts = { [CONTACT_TYPE_EMAIL]: string[], [CONTACT_TYPE_PHONE]: string[] };

// REVOKE DELETE, TRUNCATE ON public.artist FROM public;
