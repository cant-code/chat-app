import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB successfully connected'))
.catch((e) => console.log(e));