const getEnv = () => {
    const dev = {
        appUrl: process.env.NEXT_API_URL,
    }
    const prod = {
        appUrl: process.env.NEXT_API_URL
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