import router from 'router'

const router = express.Router()

router.post('adminlogin', adminlogin)
router.post('/adminsignup',adminsignup)

export default router;