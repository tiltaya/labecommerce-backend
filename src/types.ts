export type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string
}

export type TProducts = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type TPurchase = {
    id: string,
    buyer: string,
    products: {id: string, quantity: number}[]
}