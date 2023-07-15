import express from 'express'
import cors from 'cors'
import { app as newPurchaseApp } from "./add_new_purchase";
import { app as getPurchaseByIdApp } from "./get_purchase_by_id";
import { app as getAllPurchasesApp } from './get_all_purchases';
import { app as deletePurchaseByIdApp } from './delete_purchase_by_id';

export const app = express()

app.use(express.json())
app.use(cors())
app.use(newPurchaseApp)
app.use(getPurchaseByIdApp)
app.use(getAllPurchasesApp)
app.use(deletePurchaseByIdApp)