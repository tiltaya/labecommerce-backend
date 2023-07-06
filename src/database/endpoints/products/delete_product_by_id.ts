import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

const app = express()

app.use(express.json())
app.use(cors())

// Delete product by id - AINDA NÃO REFATORADO, QUEBRADO
// app.delete('/products/:id', (req: Request, res: Response) => {
//     try {
//         const id = req.params.id
//         const findProductIndex = products.findIndex((product) => {
//             return product.id === id
//         })
//         const productId = products.find((product) => product.id === id)
    
//         if (!productId) {
//             res.statusCode = 404
//             throw new Error ('Produto não encontrado. Verifique o id.')
//         }
    
//         if (findProductIndex >= 0) {
//             products.splice(findProductIndex, 1)
//             res.status(200).send('Produto apagado com sucesso')
//         } else {
//             res.status(200).send('Produto não encontrado')
//         }
//     } catch (error) {
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.status(500).send('Erro desconhecido')
//         }
//     }
// })