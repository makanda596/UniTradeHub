import rateLimit from 'express-rate-limit'

export const AdminrateLimiter = rateLimit({
    limit:2,
    windowsMs:24*60*60*1000,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
})