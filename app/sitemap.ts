import type { MetadataRoute } from "next";
import { fetchConcertIDs } from "@/app/lib/data.ts";

const BASE_URL = "https://alexander-kudryavtsev.com";

export async function generateSitemaps() {
    // Fetch the total number of products and calculate the number of sitemaps needed
    return await fetchConcertIDs();
}

export default async function sitemap({
                                          id, date
                                      }: {
    id: string, date: Date
}): Promise<MetadataRoute.Sitemap> {
    // Google's limit is 50,000 URLs per sitemap

    return [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
            alternates: {
                languages: {
                    ru: `${BASE_URL}/ru`,
                },
            },
        },
        {
            url: `${BASE_URL}/concerts/${id}`,
            lastModified: date,
            alternates: {
                languages: {
                    ru: `${BASE_URL}/ru/concerts/${id}`,
                },
            },
        },
        {
            url: `${BASE_URL}/contacts`,
            lastModified: new Date(),
            alternates: {
                languages: {
                    ru: `${BASE_URL}/ru/contacts`,
                },
            },
        },
        {
            url: `${BASE_URL}/records`,
            lastModified: new Date(),
            alternates: {
                languages: {
                    ru: `${BASE_URL}/ru/records`,
                },
            },
        },
        {
            url: `${BASE_URL}/concerts`,
            lastModified: new Date(),
            alternates: {
                languages: {
                    ru: `${BASE_URL}/ru/concerts`,
                },
            },
        },
        {
            url: `${BASE_URL}/support`,
            lastModified: new Date(),
            alternates: {
                languages: {
                    ru: `${BASE_URL}/ru/support`,
                },
            },
        },
    ];
}