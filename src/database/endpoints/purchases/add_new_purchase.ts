import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

const app = express()

app.use(express.json())
app.use(cors())

// Add new purchase
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const {id, buyer, total_price} = req.body

        if (id !== undefined) {
            if (typeof(id) !== 'string') {
            res.status(422)
            throw new Error ('O valor "id" deve ser em formato de texto')
            }

            if (id.length < 4) {
                res.status(400)
                throw new Error ('O id deve ter o formato "p00x", onde X será o número da compra.')
            }

        }

        if (buyer !== undefined) {
            if (typeof(buyer) !== 'string') {
            res.status(422)
            throw new Error ('O valor "buyer" deve ser em formato de texto')
            }
        }

        if (total_price !== undefined) {
            if (typeof(buyer) !== 'string') {
            res.status(422)
            throw new Error ('O valor "total_price" deve ser em formato de texto')
            }
        }
        
        const result = await db.raw(`
        INSERT INTO purchases (id, buyer, total_price, created_at)
        VALUES ("${id}", "${buyer}", "${total_price}", DATETIME("now"));`)
        res.status(200).send('Compra cadastrada com sucesso')

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})