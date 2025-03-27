import router from 'router'
import { sendMessage } from '../controllers/messageController';

const router = express.Router()

router.post('/sendMessage',sendMessage)

export default router;