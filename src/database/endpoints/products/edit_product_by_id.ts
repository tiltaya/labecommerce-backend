import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())


// Edit product by id
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id
        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImageUrl = req.body.imageUrl

        // Verificação newId
        if (newId !== undefined) {
            if (typeof(newId) !== 'string') {
                res.status(422)
                throw new Error ('"Id" deve ser do tipo texto')
            }
            
        if (!newId.includes('prod')) {
            res.status(400)
            throw new Error ('Id inválido. Deve começar com "prod" e em seguida a numeração, exemplo: prod004')
            }
        }

        // Verificação name
        if (newName !== undefined) {
            if (typeof(newName) !== 'string') {
                res.status(422)
                throw new Error ('O valor de "name" deve ser do tipo texto')
                }
        }

        // Verificação price
        if (newPrice !== undefined) {
            if (typeof(newPrice) !== 'number') {
                res.status(422)
                throw new Error ('O valor de "price" deve ser numérico')
            }

            if (newPrice < 0) {
                res.status(400)
                throw new Error ('Valor de "price" precisa ser maior que zero')
            }
        }

        // Verificação description
        if (newDescription !== undefined)  {
            if (typeof(newDescription) !== 'string') {
                res.status(422)
                throw new Error ('"description" deve ser do tipo texto')
            }
        }

        // Verificação imageUrl
        if (newImageUrl !== undefined) {
            if (typeof(newImageUrl) !== 'string') {
                res.status(422)
                throw new Error ('"imageUrl" deve ser do tipo texto')
            }
        }
        
        const [ product ] = await db.select("*").from("products").where({id: idToEdit})

        const editProduct = {
            id: newId || product.id,
            name: newName || product.name,
            price: newPrice || product.price,
            description: newDescription || product.description,
            image_url: newImageUrl || product.image_url
        }
    
        if (product) {
            await db("products").update(editProduct).where({id: idToEdit})

            res.status(200).send('Produto atualizado com sucesso')
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