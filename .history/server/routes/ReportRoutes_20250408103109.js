import express from 'express'

const router = express.Router()

router.post('/makeReport', makeReport)

export default router;