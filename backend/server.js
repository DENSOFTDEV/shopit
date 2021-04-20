const app = require('./app')
const connectDatabse = require('./config/database')
const cloudinary = require('cloudinary')


//handle uncaught exceptions
process.on('uncaughtException', error => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
})

//setting up config file
if (process.env.NODE_ENV === 'PRODUCTION') require('dotenv').dotenv.config({path: 'backend/config/config.env'});

//connecting to db
connectDatabse();

//setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const port = process.env.PORT;
const environment = process.env.NODE_ENV;

const server = app.listen(port, () => {
    console.log(`server started on port: ${port} in ${environment} mode.`)
})

//handle unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})