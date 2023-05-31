import {TProducts, TUsers} from './types'

export const users: TUsers[] = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: new Date().toISOString()
    },
    {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: new Date().toISOString()
    }
]

export const products: TProducts[] = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
]

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

createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99")

createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/t/2/t253pg250g3c313.jpg')

searchProductsByName("gamer")
getAllProducts()
getAllUsers()