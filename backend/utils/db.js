import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect("mongodb+srv://ritikgupta1424:WRdnbS610yMdL6lT@cluster0.vqbikv5.mongodb.net/");
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;