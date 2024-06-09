var cors = require('cors')


const WHITELIST_DOMAINS = ['http://localhost:3000', 'http://localhost:3004', 'http://localhost:5173', 'http://localhost:4200']

// cau hinh corsOption 
export const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            // && env.BUILD_MODE === 'dev'
            return callback(null, true)
        }

        if (WHITELIST_DOMAINS.includes(origin)) {
            return callback(null, true)
        }

        return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
    },

    optionsSuccessStatus: 200,
    credentials: true
}


