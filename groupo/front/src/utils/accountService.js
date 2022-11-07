import Axios from "./Axios"
import jwt_decode from 'jwt-decode'

let signup = (credentials) => {
    return Axios.post('/api/signup', credentials)
}

let login = (credentials) => {
    return Axios.post('/api/login', credentials)
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

let getToken = () => {
    return localStorage.getItem('token')
}

let getInfo = () => {
    return jwt_decode(getToken())
}

//  admin user
let getAdmin = () => {
    return '63693c4fa0d5eb670cb0a5c9'
}

export const accountService = {
    signup, login, saveToken, logout, isLogged, getToken, getInfo, getAdmin
}