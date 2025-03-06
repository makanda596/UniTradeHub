import express from 'express'
import { signup, login, logout, getUsers } from '../controllers/userControllers.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getUsers', getUsers)

export default router