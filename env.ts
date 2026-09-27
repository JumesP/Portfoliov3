type SupportedInstance = "production" | "staging" | "development";

interface RouteConfig {
    contactMe: string; // standAlone-contactMe
    callAi: string;    // standAlone-callAI
}

// Reads a required env var and throws immediately if it's missing,
// instead of silently falling back to "" or undefined.
function requireEnv(key: string): string {
    const value = process.env[key];
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

    const prefix = instanceRaw.toUpperCase(); // PRODUCTION | STAGING | DEVELOPMENT

    return {
        contactMe: requireEnv(`NEXT_PUBLIC_${prefix}_CONTACT_ME_URL`),
        callAi: requireEnv(`NEXT_PUBLIC_${prefix}_CALL_AI_URL`),
    };
}

export const config: RouteConfig = loadConfig();
