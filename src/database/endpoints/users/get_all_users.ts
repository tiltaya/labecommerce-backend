import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

const app = express()

app.use(express.json())
app.use(cors())


// Get all users
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT * FROM users;`)
        res.status(200).send(result)
        
    } catch (error) {
        res.statusCode = 404
        throw new Error ('Conta não encontrada. Verifique o endereço.')
    }
})