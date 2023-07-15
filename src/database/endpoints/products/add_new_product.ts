import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())

// Add new product
app.post('/products', async (req: Request, res: Response) => {
    try {
        const {id, name, price, description, image_url} = req.body

        if (id !== undefined) {
            if (typeof(id) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "id" deve ser uma string')
            }

            if (id.length < 6) {
                res.status(400)
                throw new Error ('O id deve ter o formato "prod00x", onde X será o número do usuário.')
            }
        }

        if (name !== undefined) {
            if (typeof(name) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "name" deve ser uma string')
            }
        }

        if (price !== undefined) {
            if (typeof(price) !== "number") {
            res.status(422)
            throw new Error ('O valor de "price" deve ser um número')
            }
        }

        if (description !== undefined) {
            if (typeof(description) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "description" deve ser uma string')
            }
        }

        if (image_url !== undefined) {
            if (typeof(image_url) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "image_url" deve ser uma string')
            }
        }

        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: image_url
        }

        await db("products").insert(newProduct)

        res.status(201).send('Produto cadastrado com sucesso')
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})