import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

const app = express()

app.use(express.json())
app.use(cors())

// Procura produtos por nome ou mostra todos os produtos
app.get('/products', async (req: Request, res: Response) => {
    try {
        const q = req.query.q

        if (q !== undefined) {
            if (typeof(q) !== 'string') {
            res.status(422)
            throw new Error ('O valor buscado deve ser uma string')
            }
        }

        if (q === undefined) {
            const result = await db.raw(`SELECT * FROM products;`)
            res.status(200).send(result)
        }
        
        const result = await db.raw(`
        SELECT * FROM products
        WHERE name LIKE '%${q}%';`)
        res.status(200).send(result)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})