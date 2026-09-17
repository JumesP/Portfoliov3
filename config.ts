type supportedInstance = "production" | "staging" | "development";

export const URL_MAP = {
    production: {
        example: // lambda name
            "", // lambda url
        contactMe: // lambda name
            "https://gx4yyt7nlfat7pzmqq3e7r7iu40lttah.lambda-url.eu-north-1.on.aws/", // lambda url
    },
    staging: {
        example: // lambda name
            "example", // lambda url
        contactMe: // lambda name
            "https://gx4yyt7nlfat7pzmqq3e7r7iu40lttah.lambda-url.eu-north-1.on.aws/", // lambda url
    },
    development: {
        example: // lambda name
            "example", // lambda url
        contactMe: // lambda name
            "https://gx4yyt7nlfat7pzmqq3e7r7iu40lttah.lambda-url.eu-north-1.on.aws/", // lambda url
    }
}

type URLMap = typeof URL_MAP.production | typeof URL_MAP.staging | typeof URL_MAP.development;

const instance = process.env.NEXT_PUBLIC_INSTANCE as supportedInstance;
if (!instance) {
    throw new Error("NEXT_PUBLIC_INSTANCE environment variable is not defined");
}

const config: URLMap = URL_MAP[instance];

export { config }