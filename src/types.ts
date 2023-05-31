export type TUsers = {
    id: string | number,
    name: string,
    email: string,
    password: string | number,
    createdAt: string
}

export type TProducts = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}