const variables = {
    PORT: process.env.PORT || 3000,
    VERSION: '1.0.0',
    APP_NAME: 'Hera',
    DATABASE: {
        PROVIDER: 'sqlite',
        URL: 'file:./dev.db'
    },
    JWT_SECRET: 'secret'
}

export default variables