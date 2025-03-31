import express from 'express'

const router = express.Router()

router.post('/followUser', FollowUser)

export default router;