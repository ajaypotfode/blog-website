import mongoose from "mongoose"

export const databaseConnection = async (): Promise<void> => {
    const CONNECTION_STR = process.env.CONNECTION_STR || ""
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already Database connected!!");
            return
        }

        await mongoose.connect(CONNECTION_STR)
        console.log("DataBase Connected SuccessFully!!");

    } catch (error) {
        console.log("Failed To Connect With Database :", error);
        
        // this is use to terminate entire app when Data Base Connections faills
        // process.exit(1)
    }
}