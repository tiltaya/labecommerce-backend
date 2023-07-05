import { users, products } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TUsers, TProducts } from "./types";
import { db } from "./database/knex";

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
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT * FROM users;`)
        res.status(200).send(result)
        
    } catch (error) {
        res.statusCode = 404
        throw new Error ('Conta não encontrada. Verifique o endereço.')
    }
})

// Procura produtos por nome ou mostra todos os produtos
app.get('/products', async (req: Request, res: Response) => {
    try {
        const q = req.query.q

        if (q !== undefined) {
            if (typeof(q) !== 'string') {
            res.status(422)
            throw new Error ('O valor buscado deve ser uma string')
            }
        }

        if (q === undefined) {
            const result = await db.raw(`SELECT * FROM products;`)
            res.status(200).send(result)
        }
        
        const result = await db.raw(`
        SELECT * FROM products
        WHERE name LIKE '%${q}%';`)
        res.status(200).send(result)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})

// Procurar produtos por id
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (id !== undefined) {
            if (typeof(id) !== 'string') {
            res.status(422)
            throw new Error ('O valor buscado deve ser uma string')
            }
        }
        
        const result = await db.raw(`
        SELECT * FROM products
        WHERE id LIKE '%${id}%';`)
        res.status(200).send(result)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})

// Procurar compra por id
app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (id !== undefined) {
            if (typeof(id) !== 'string') {
            res.status(422)
            throw new Error ('O valor buscado deve ser uma string')
            }
        }
        
        const result = await db.raw(`
        SELECT * FROM purchases
        WHERE id LIKE '%${id}%';`)
        res.status(200).send(result)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})

// Criar novo user
app.post('/users', async (req: Request, res: Response) => {
    try {
        const {id, name, email, password} = req.body

        if (id !== undefined) {
            if (typeof(id) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "id" deve ser uma string')
            }

            if (id.length < 4) {
                res.status(400)
                throw new Error ('O id deve ter o formato "u00x", onde X será o número do usuário.')
            }
        }

        if (name !== undefined) {
            if (typeof(name) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "name" deve ser uma string')
            }
        }

        if (email !== undefined) {
            if (typeof(email) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "email" deve ser uma string')
            }
        }

        if (password !== undefined) {
            if (typeof(password) !== 'string') {
            res.status(422)
            throw new Error ('O valor de "password" deve ser uma string')
            }
        }

        const result = await db.raw(`
        INSERT INTO users (id, name, email, password, created_at)
        VALUES ("${id}", "${name}", "${email}", "${password}", DATETIME("now"));`)
        res.status(201).send('Cadastro realizado com sucesso')
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})

// Criar novo produto
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

        const result = await db.raw(`
        INSERT INTO products (id, name, price, description, image_url)
        VALUES ("${id}", "${name}", "${price}", "${description}", "${image_url}");`)
        res.status(201).send('Produto cadastrado com sucesso')
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
    }
})

// Criar nova compra
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const {id, buyer, total_price} = req.body

        if (id !== undefined) {
            if (typeof(id) !== 'string') {
            res.status(422)
            throw new Error ('O valor "id" deve ser em formato de texto')
            }

            if (id.length < 4) {
                res.status(400)
                throw new Error ('O id deve ter o formato "p00x", onde X será o número da compra.')
            }

        }

        if (buyer !== undefined) {
            if (typeof(buyer) !== 'string') {
            res.status(422)
            throw new Error ('O valor "buyer" deve ser em formato de texto')
            }
        }

        if (total_price !== undefined) {
            if (typeof(buyer) !== 'string') {
            res.status(422)
            throw new Error ('O valor "total_price" deve ser em formato de texto')
            }
        }
        
        const result = await db.raw(`
        INSERT INTO purchases (id, buyer, total_price, created_at)
        VALUES ("${id}", "${buyer}", "${total_price}", DATETIME("now"));`)
        res.status(200).send('Compra cadastrada com sucesso')

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
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Erro desconhecido')
        }
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