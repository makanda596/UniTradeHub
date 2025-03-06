import express from 'express'
import { signup, login, logout, getUsers, profile, updateUser, deleteUser } from '../controllers/userControllers.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getUsers', getUsers)
// router.get('/getUser', getUser)
router.get('/profile/id', profile)
router.put('/update/:id' ,updateUser)
router.delete('/delete/:id', deleteUser)

export default router