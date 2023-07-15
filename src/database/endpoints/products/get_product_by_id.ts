import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())

// Procurar produtos por id
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (id !== undefined) {
            if (typeof(id) !== 'string') {
            res.status(422)
            throw new Error ('O valor buscado deve ser uma string')
            }
        }

        const result = await db("products").select("*").where("id", "LIKE", `%${id}%`)

        res.status(200).send(result)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})