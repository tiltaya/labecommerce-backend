import { users, products } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TUsers, TProducts } from "./types";

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
    try {
        res.status(200).send(users)
    } catch (error) {
        res.statusCode = 404
        throw new Error ('Conta não encontrada. Verifique o endereço.')
    }
})

// Procura produtos por nome ou mostra todos os produtos
app.get('/products', (req: Request, res: Response) => {
    try {
        const name = req.query.name

        if (name !== undefined) {
            if (typeof(name) !== 'string') {
            res.status(422)
            throw new Error ('O valor buscado deve ser uma string')
            }

            if (name.length < 1) {
                res.status(400)
                throw new Error ('O valor deve ser maior que um caracter')
            }
        }

        if (name === undefined) {
            return res.status(200).send(products)
            }
        
        const productsByName = products.filter((product) => {
            return product.name.toLowerCase().includes(name.toLowerCase())
        })
        res.status(200).send(productsByName)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})

// Criar novo user
app.post('/users', (req: Request, res: Response) => {
    try {
        const {id, name, email, password} = req.body
        const newUser: TUsers = {id, name, email, password, createdAt: new Date().toISOString()}
        const user = users.find((user) => user.id === id)
        const userEmail = users.find((user) => user.email === email)
        if (user) {
            res.status(400)
            throw new Error ('Já existe uma conta com esse id')
        }
        if (userEmail) {
            res.status(400)
            throw new Error ('Já existe uma conta com esse e-mail')
        }

        users.push(newUser)
        res.status(201).send('Cadastro realizado com sucesso')
        console.log(users);
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }

})

// Criar novo produto
app.post('/products', (req: Request, res: Response) => {
    try {
        const {id, name, price, description, imageUrl} = req.body
        const newProduct: TProducts = {id, name, price, description, imageUrl}
        const newProductId = products.find((product) => product.id === id)

        if (newProductId) {
            res.status(400)
            throw new Error ('Já existe um produto com esse id')
        }

        products.push(newProduct)
        res.status(201).send('Produto cadastrado com sucesso')
        console.log(products);
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }

})

// Deletar user by id
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const findUserIndex = users.findIndex((user) => {
            return user.id === id
        })
        const userId = users.find((user) => user.id === id)
    
        if (!userId) {
            res.statusCode = 404
            throw new Error ('Conta não encontrada. Verifique o id.')
        }
    
        if (findUserIndex >= 0) {
            users.splice(findUserIndex, 1)
            res.status(200).send('User apagado com sucesso')
        } else {
            res.status(200).send('User não encontrado')
        }
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }

})

// Deletar produto by id
app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const findProductIndex = products.findIndex((product) => {
            return product.id === id
        })
        const productId = products.find((product) => product.id === id)
    
        if (!productId) {
            res.statusCode = 404
            throw new Error ('Produto não encontrado. Verifique o id.')
        }
    
        if (findProductIndex >= 0) {
            products.splice(findProductIndex, 1)
            res.status(200).send('Produto apagado com sucesso')
        } else {
            res.status(200).send('Produto não encontrado')
        }
    } catch (error) {
        
    }

})

// Editar produto por id
app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const {newId, name, price, description, imageUrl} = req.body
        const findProducts = products.find((product) => {
            return product.id === id
        })

        // Verificação id
        if (!findProducts) {
            res.statusCode = 404
            throw new Error ('Produto não encontrado. Verifique o id.')
        }

        // Verificação newId
        if (newId !== undefined) {
            if (typeof(newId) !== 'string') {
                res.status(422)
                throw new Error ('"Id" deve ser uma string')
            }
            
        if (!newId.includes('prod')) {
            res.status(400)
            throw new Error ('Id inválido. Deve começar com "prod" e em seguida a numeração, exemplo: prod004')
            }
        }

        // Verificação name
        if (name !== undefined) {
            if (typeof(name) !== 'string') {
                res.status(422)
                throw new Error ('"ownerName" deve ser uma string')
                }
        }

        // Verificação price
        if (price !== undefined) {
            if (typeof(price) !== 'number') {
                res.status(422)
                throw new Error ('Valor de "price" deve ser numérico')
            }

            if (price < 0) {
                res.status(400)
                throw new Error ('Valor de "price" precisa ser maior que zero')
            }
        }

        // Verificação description
        if (description !== undefined)  {
            if (typeof(description) !== 'string') {
                res.status(422)
                throw new Error ('"description" deve ser uma string')
            }
        }

        // Verificação imageUrl
        if (imageUrl !== undefined) {
            if (typeof(imageUrl) !== 'string') {
                res.status(422)
                throw new Error ('"imageUrl" deve ser uma string')
            }
        }
    
        if (findProducts) {
            findProducts.id = newId || findProducts.id
            findProducts.name = name || findProducts.name
            findProducts.price = price || findProducts.price
            findProducts.description = description || findProducts.description
            findProducts.imageUrl = imageUrl || findProducts.imageUrl
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

// Exercícios de Type e database
export function createUser (id:string, name:string, email:string, password:string) {
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