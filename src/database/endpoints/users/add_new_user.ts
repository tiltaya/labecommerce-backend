import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())

// Criar novo user
app.post('/users', async (req: Request, res: Response) => {
    try {
        const {id, name, email, password} = req.body

        if (id !== undefined) {
            if (typeof(id) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "id" deve ser em formato de texto.')
            }

            if (id.length < 4) {
                res.status(400)
                throw new Error ('O id deve ter o formato "u00x", onde X será o número do usuário.')
            }
        }

        if (name !== undefined) {
            if (typeof(name) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "name" deve ser em formato de texto.')
            }
        }

        if (email !== undefined) {
            if (typeof(email) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "email" deve ser em formato de texto.')
            }
        }

        if (password !== undefined) {
            if (typeof(password) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "password" deve ser em formato de texto.')
            }
        }

        const newUser = {
            id: id,
            name: name,
            email: email,
            password: password,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        
        await db("users").insert(newUser)

        res.status(201).send('Cadastro realizado com sucesso')
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})