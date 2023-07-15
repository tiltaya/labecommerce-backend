import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())

// Delete product by id
app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const productId = await db("products").where({id: idToDelete})
    
        if (!productId) {
            res.statusCode = 404
            throw new Error ('Produto não encontrado. Verifique o id.')
        }
    
        if (productId) {
            await db("products").del().where({id: idToDelete})
        
            res.status(200).send('Produto apagado com sucesso')
        } else {
            res.status(200).send('Produto não encontrado')
        }
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})