import express from 'express'
import { signup ,login} from '../controllers/userControllers.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
export default router