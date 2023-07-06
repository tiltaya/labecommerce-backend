import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from '../../knex'

const app = express()

app.use(express.json())
app.use(cors())

// Delete user by id - AINDA NÃO REFATORADO, QUEBRADO
// app.delete('/users/:id', (req: Request, res: Response) => {
//     try {
//         const id = req.params.id
//         const findUserIndex = users.findIndex((user) => {
//             return user.id === id
//         })
//         const userId = users.find((user) => user.id === id)
    
//         if (!userId) {
//             res.statusCode = 404
//             throw new Error ('Conta não encontrada. Verifique o id.')
//         }
    
//         if (findUserIndex >= 0) {
//             users.splice(findUserIndex, 1)
//             res.status(200).send('User apagado com sucesso')
//         } else {
//             res.status(200).send('User não encontrado')
//         }
//     } catch (error) {
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.status(500).send('Erro desconhecido')
//         }
//     }
// })