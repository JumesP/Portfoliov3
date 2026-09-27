type SupportedInstance = "production" | "staging" | "development";

interface RouteConfig {
    contactMe: string; // standAlone-contactMe
    callAi: string;    // standAlone-callAI
}

// Reads a required env var and throws immediately if it's missing,
// instead of silently falling back to "" or undefined.
function requireEnv(key: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

function isSupportedInstance(value: string | undefined): value is SupportedInstance {
    return value === "production" || value === "staging" || value === "development";
}

function loadConfig(): RouteConfig {
    const instanceRaw = process.env.NEXT_PUBLIC_INSTANCE;
    if (!isSupportedInstance(instanceRaw)) {
        throw new Error(
            `NEXT_PUBLIC_INSTANCE must be one of "production" | "staging" | "development", got: ${instanceRaw}`
        );
    }

    if (instanceRaw === "production") {
        return {
            contactMe: requireEnv(
                "NEXT_PUBLIC_PRODUCTION_CONTACT_ME_URL",
                process.env.NEXT_PUBLIC_PRODUCTION_CONTACT_ME_URL
            ),
            callAi: requireEnv(
                "NEXT_PUBLIC_PRODUCTION_CALL_AI_URL",
                process.env.NEXT_PUBLIC_PRODUCTION_CALL_AI_URL
            ),
        };
    }

    if (instanceRaw === "staging") {
        return {
            contactMe: requireEnv(
                "NEXT_PUBLIC_STAGING_CONTACT_ME_URL",
                process.env.NEXT_PUBLIC_STAGING_CONTACT_ME_URL
            ),
            callAi: requireEnv(
                "NEXT_PUBLIC_STAGING_CALL_AI_URL",
                process.env.NEXT_PUBLIC_STAGING_CALL_AI_URL
            ),
        };
    }

    return {
        contactMe: requireEnv(
            "NEXT_PUBLIC_DEVELOPMENT_CONTACT_ME_URL",
            process.env.NEXT_PUBLIC_DEVELOPMENT_CONTACT_ME_URL
        ),
        callAi: requireEnv(
            "NEXT_PUBLIC_DEVELOPMENT_CALL_AI_URL",
            process.env.NEXT_PUBLIC_DEVELOPMENT_CALL_AI_URL
        ),
    };
}

export const config: RouteConfig = loadConfig();
