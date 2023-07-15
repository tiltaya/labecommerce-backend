import express from 'express'
import cors from 'cors'
import {app as newUserApp} from "./add_new_user";
import {app as deleteUserByIdApp} from "./delete_user_by_id";
import {app as getAllUsersApp} from "./get_all_users";

export const app = express()

app.use(express.json())
app.use(cors())
app.use(newUserApp)
app.use(deleteUserByIdApp)
app.use(getAllUsersApp)