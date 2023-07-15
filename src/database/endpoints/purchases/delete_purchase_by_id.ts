import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())

// Delete purchase by id
app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const purchaseId = await db("purchases").where({id: idToDelete})
    
        if (!purchaseId) {
            res.statusCode = 404
            throw new Error ('Compra não encontrada. Verifique o id.')
        }
    
        if (purchaseId) {
            await db("purchases").del().where({id: idToDelete})
        
            res.status(200).send('Pedido cancelado com sucesso')
        } else {
            res.status(200).send('Compra não encontrada.')
        }
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})