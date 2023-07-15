import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())

// Procura produtos por nome ou mostra todos os produtos
app.get('/products', async (req: Request, res: Response) => {
    try {
        const search = req.query.search

        if (search !== undefined) {
            if (typeof(search) !== 'string') {
            res.status(422)
            throw new Error ('O valor buscado deve ser do tipo  texto.')
            }
        }

        if (search === undefined) {
            const result = await db.select("*").from("products")

            res.status(200).send(result)
        }

        const result = await db("products").select("*").where("name", "LIKE", `%${search}%`)

        res.status(200).send(result)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})