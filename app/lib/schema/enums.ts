import { pgEnum } from "drizzle-orm/pg-core";

export const RECORD_SERVICES_YOUTUBE = "youtube";

export const CONTACT_TYPE_PHONE = "phone";
export const CONTACT_TYPE_EMAIL = "email";

export const SOCIAL_TYPE_FACEBOOK = "facebook";
export const SOCIAL_TYPE_TWITTER = "twitter";
export const SOCIAL_TYPE_LINKEDIN = "linkedin";
export const SOCIAL_TYPE_YOUTUBE = "youtube";
export const SOCIAL_TYPE_INSTAGRAM = "instagram";
export const SOCIAL_TYPE_TELEGRAM = "telegram";
export const SOCIAL_TYPE_PATREON = "patreon";

export const RELATED_RECORD_TYPE_CONCERT = "concert";

export const NOT_RELATED_RECORD_TYPE_STUDIO = "studio";
export const NOT_RELATED_RECORD_TYPE_WORKSHOP = "workshop";

export const recordServicesEnum = pgEnum("record_services", [RECORD_SERVICES_YOUTUBE]);
export const recordServicesValues = recordServicesEnum.enumValues;
export type recordService = typeof recordServicesValues[number];

export const contactTypesEnum = pgEnum("contact_types", [CONTACT_TYPE_PHONE, CONTACT_TYPE_EMAIL]);
export const contactTypesValues = contactTypesEnum.enumValues;
export type contactType = typeof contactTypesValues[number];

export const socialTypesEnum = pgEnum("social_types", [SOCIAL_TYPE_FACEBOOK, SOCIAL_TYPE_YOUTUBE, SOCIAL_TYPE_INSTAGRAM, SOCIAL_TYPE_TWITTER, SOCIAL_TYPE_LINKEDIN, SOCIAL_TYPE_TELEGRAM, SOCIAL_TYPE_PATREON]);
export const socialTypesValues = socialTypesEnum.enumValues;
export type socialType = typeof socialTypesValues[number];

export const relatedRecordTypesEnum = pgEnum("related_record_types", [RELATED_RECORD_TYPE_CONCERT]);

export const recordTypesEnum = pgEnum("record_types", [...relatedRecordTypesEnum.enumValues, NOT_RELATED_RECORD_TYPE_STUDIO, NOT_RELATED_RECORD_TYPE_WORKSHOP]);
export const recordTypesValues = recordTypesEnum.enumValues;
export type recordType = typeof recordTypesValues[number];