import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

export const app = express()

app.use(express.json())
app.use(cors())

// Delete user by id
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const user = await db("users").where({id: idToDelete})

        if(!user){
            res.status(400);
            throw new Error ("'id' não encontrada")            
        }

        if (user) {
            await db("users").del().where({id: idToDelete})

            res.status(200).send('Usuário apagado com sucesso')
        } else {
            res.status(200).send('Usuário não encontrado')
        }
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