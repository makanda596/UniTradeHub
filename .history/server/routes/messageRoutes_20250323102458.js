import router from 'router'
import { sendMessage } from '../controllers/messageController.js';

const router = express.Router()

router.post('/sendMessage',sendMessage)

export default router;