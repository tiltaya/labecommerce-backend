import { users, products } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TUsers, TProducts } from "./types";

// Exercícios de APIs e Express
const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003');
    
})

// Teste API
app.get('/', (req: Request, res: Response) => {
    res.send('API rodando!')
})

// Ping
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})
// Mostrar todos os usuários
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})
// Procura produtos por nome ou mostra todos os produtos
app.get('/products', (req: Request, res: Response) => {
    const name = req.query.name as string
    if (!name) {
        res.status(200).send(products)
    }
    const productsByName = products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase())
    })
    res.status(200).send(productsByName)
})
// Criar novo user
app.post('/users', (req: Request, res: Response) => {
    const {id, name, email, password} = req.body
    const newUser: TUsers = {id, name, email, password, createdAt: new Date().toISOString()}
    users.push(newUser)
    res.status(201).send('Cadastro realizado com sucesso')
    console.log(users);
})
// Criar novo produto
app.post('/products', (req: Request, res: Response) => {
    const {id, name, price, description, imageUrl} = req.body
    const newProduct: TProducts = {id, name, price, description, imageUrl}
    products.push(newProduct)
    res.status(201).send('Produto cadastrado com sucesso')
    console.log(products);
    
})
// Exercícios de Type e database
export function createUser (id:string | number, name:string, email:string, password:string | number) {
    users.push({
        id, 
        name, 
        email, 
        password, 
        createdAt: new Date().toISOString()
    })
    console.log("Cadastro realizado com sucesso!");
    console.table(users)
}

export function getAllUsers () {
    console.table(users)
}

export function createProduct (id:string, name:string, price: number, description:string, imageUrl:string) {
    products.push({id, name, price, description, imageUrl})
    console.log("Produto criado com sucesso!");
    console.log(products)
}

export function getAllProducts () {
    console.log(products)
}

export function searchProductsByName (name:string) {
    const searchProduct = products.filter((product) => product.name.includes(name))
    console.log(searchProduct);
}

// CHAMADA DOS EXERCÍCIOS DE TYPE E DATABASE

// createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99")

// createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/t/2/t253pg250g3c313.jpg')

// searchProductsByName("gamer")
// getAllProducts()
// getAllUsers()