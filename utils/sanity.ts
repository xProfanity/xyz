import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-04-22',
    token: process.env.SANITY_PROJECT_TOKEN
})