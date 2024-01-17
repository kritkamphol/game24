import * as mongoose from "mongoose"

export const masterDataSchema = new mongoose.Schema({
    number:{
        type:String
    },
    formula:{
        type:String
    },

})

export interface ImasterData extends Document{
    number:string
    formula:string
}