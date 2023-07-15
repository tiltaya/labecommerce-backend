import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())

// Get purchase by id
app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (id !== undefined) {
            if (typeof(id) !== 'string') {
            res.status(422)
            throw new Error ('O valor buscado deve ser em formato de texto.')
            }
        }

        // const result = await db("purchases").select("*").where("id", "LIKE", `%${id}%`)

        const compraId = await db("purchases_products").where("purchase_id", "LIKE", `%${id}%`)

        const listaProdutos = []
        
        for(let product of compraId){
            const componenteProduto = await db("products").where({id: product.product_id})
            listaProdutos.push(componenteProduto)
        }

        console.log(compraId);

        const result = await db("purchases").select(
            "purchases.id AS purchaseId",
            "purchases.buyer AS buyerId",
            "users.name AS buyerName",
            "users.email AS buyerEmail",
            "purchases.total_price AS totalPrice",
            "purchases.created_at AS createdAt",
          ).innerJoin("users", "purchases.buyer", "=", "users.id")
          .where({ id: id });

        res.status(200).send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})