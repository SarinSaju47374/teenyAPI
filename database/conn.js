import mongoose from "mongoose"

export const conn = async (url)=>{
    return await mongoose.connect(url)
}