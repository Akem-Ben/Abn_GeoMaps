"use client";

interface Secrets {
    apiHost: string;
}

interface Config {
    secrets: Secrets;
}

let cache: Config | null = null;

const config = (): Config => {
    if (!cache) {
        cache = Object.freeze({
            secrets: {
                apiHost: process.env.NEXT_PUBLIC_API_HOST || "https://localhost:3000",
            },
        });
    }
    return cache;
};

export default config;
