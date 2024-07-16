import mongoose from "mongoose";

const validObjectId = (string) => {
    return mongoose.Types.ObjectId.isValid(string)
}

export default validObjectId