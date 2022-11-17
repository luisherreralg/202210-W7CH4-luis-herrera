import mongoose from 'mongoose';

export function dbDisconnect() {
    mongoose.disconnect();
    console.log(mongoose.connection.readyState);
}
