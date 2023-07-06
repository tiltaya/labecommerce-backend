import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

const app = express()

app.use(express.json())
app.use(cors())


// Edit product by id - AINDA NÃO REFATORADO, QUEBRADO
// app.put("/products/:id", (req: Request, res: Response) => {
//     try {
//         const id = req.params.id
//         const {newId, name, price, description, imageUrl} = req.body
//         const findProducts = products.find((product) => {
//             return product.id === id
//         })

//         // Verificação id
//         if (!findProducts) {
//             res.statusCode = 404
//             throw new Error ('Produto não encontrado. Verifique o id.')
//         }

//         // Verificação newId
//         if (newId !== undefined) {
//             if (typeof(newId) !== 'string') {
//                 res.status(422)
//                 throw new Error ('"Id" deve ser uma string')
//             }
            
//         if (!newId.includes('prod')) {
//             res.status(400)
//             throw new Error ('Id inválido. Deve começar com "prod" e em seguida a numeração, exemplo: prod004')
//             }
//         }

//         // Verificação name
//         if (name !== undefined) {
//             if (typeof(name) !== 'string') {
//                 res.status(422)
//                 throw new Error ('"ownerName" deve ser uma string')
//                 }
//         }

//         // Verificação price
//         if (price !== undefined) {
//             if (typeof(price) !== 'number') {
//                 res.status(422)
//                 throw new Error ('Valor de "price" deve ser numérico')
//             }

//             if (price < 0) {
//                 res.status(400)
//                 throw new Error ('Valor de "price" precisa ser maior que zero')
//             }
//         }

//         // Verificação description
//         if (description !== undefined)  {
//             if (typeof(description) !== 'string') {
//                 res.status(422)
//                 throw new Error ('"description" deve ser uma string')
//             }
//         }

//         // Verificação imageUrl
//         if (imageUrl !== undefined) {
//             if (typeof(imageUrl) !== 'string') {
//                 res.status(422)
//                 throw new Error ('"imageUrl" deve ser uma string')
//             }
//         }
    
//         if (findProducts) {
//             findProducts.id = newId || findProducts.id
//             findProducts.name = name || findProducts.name
//             findProducts.price = price || findProducts.price
//             findProducts.description = description || findProducts.description
//             findProducts.imageUrl = imageUrl || findProducts.imageUrl
//             res.status(200).send('Produto atualizado com sucesso')
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