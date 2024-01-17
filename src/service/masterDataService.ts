import dotenv from 'dotenv'
import * as mongoose from "mongoose"
import {ImasterData, masterDataSchema} from "../model/masterData"

dotenv.config()
const connectionString:string = process.env.DB_CONN_STRING || ""
const collectionName:string = process.env.COLLECTION_NAME || ""
mongoose.connect(connectionString).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error('Error connecting to MongoDB', err)
})
let MasterData = mongoose.model<ImasterData>(collectionName,masterDataSchema)

export async function initialize() {
    return mongoose.createConnection(connectionString)
}

export async function getData(number:string):Promise<string[]>{
    let formulas:string[] = []
    const results = await MasterData.find({number: number}).then(result => {
        result.forEach(res => {
            formulas.push(res?.formula)
        })
    })

    return formulas
}
export async function saveData(masterData:ImasterData[]){
    try{
        return MasterData.insertMany(masterData)
    }catch (err){
        throw err
    }

}