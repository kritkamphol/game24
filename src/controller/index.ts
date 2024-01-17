import express from 'express'
import {find24} from "../utils/find24"
import {getData, initialize, saveData} from "../service/masterDataService"
import {ImasterData} from "../model/masterData"

const app = express()
const port = 3000


app.get('/cheat24', async (req, res) => {
    let number = req?.query?.number
    try {
        if (typeof number !== 'string') {
            return res.status(400).send("Invalid input")
        }
        if (number.includes("0")) {
            return res.status(400).send("There is 0 in the number")
        }
        if (number.length !== 4) {
            return res.status(400).send("Number needs to be exactly 4 characters long")
        }


        const formulas: string[] = await getData(number)
        if (formulas.length === 0) {
            let result: string[] = find24(number)
            if (result.length === 0) {
                return res.status(200).send("No solution for this number")
            }
            let bulk: ImasterData[] = []
            result.forEach(res => {
                let f = {formula: res, number: number}
                bulk?.push(<ImasterData>f)
            })
            await saveData(bulk)
            return res.status(200).send(result)
        }
        return res.status(200).send(formulas)

    } catch (e) {
        // @ts-ignore
        return res.status(500).send(e.message)
    }

})
initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}).catch(() => {
    console.log("ERROR : From starting the server")
})

