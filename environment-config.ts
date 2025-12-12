const getEnv = () => {
    const dev = {
        appUrl: process.env.NEXT_PUBLIC_APP_URL_DEV || 'http://localhost:3000',
    }
    const prod = {
        appUrl: process.env.NEXT_PUBLIC_APP_URL_PROD
    }
    switch (process.env.NODE_ENV) {
        case 'development':
            return dev
        case 'production':
            return prod
        default:
            return dev
    }
}
const env = getEnv()
export const API_URL = env.appUrl