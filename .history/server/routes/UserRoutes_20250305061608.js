import express from 'express'
import { signup, login, logout, getUsers, profile, updateUser, deleteUser, checkAuth } from '../controllers/userControllers.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getUsers', getUsers)
router.get('/check-auth', verifyToken, checkAuth)

// router.get('/getUser', getUser)
router.get('/profile', profile)
router.put('/update/:id' ,updateUser)
router.delete('/delete/:id', deleteUser)

export default router