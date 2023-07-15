import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())

// Get all purchases
app.get('/purchases', async (req: Request, res: Response) => {
    try {
        const result = await db("purchases")

        res.status(200).send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})