import mongoose from "mongoose";

const connetDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected successfully");  
    } catch (error) {
        console.log(error);
        
    }


    
}

export default connetDB;