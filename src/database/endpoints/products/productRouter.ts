import express from 'express'
import cors from 'cors'
import {app as newProductApp} from "./add_new_product";
import {app as deleteProductApp} from "./delete_product_by_id";
import {app as editProductApp} from "./edit_product_by_id";
import {app as getAllProductsApp} from "./get_all_products";
import {app as getProductByIdApp} from "./get_product_by_id";

export const app = express()

app.use(express.json())
app.use(cors())
app.use(newProductApp)
app.use(deleteProductApp)
app.use(editProductApp)
app.use(getAllProductsApp)
app.use(getProductByIdApp)