import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017'

export const connectDatabase = () => {
    mongoose
        .connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Database connected')
        })
        .catch((err) => {
            console.error('Failed to connect to MongoDB', err)
        })
}
