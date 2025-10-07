import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const PRODUCTS_URL = 'https://fakestoreapi.com/products'


export async function fetchUsers() {
    const res = await axios.get(USERS_URL)
    return res.data
}


export async function fetchProducts() {
    const res = await axios.get(PRODUCTS_URL)
    return res.data
}