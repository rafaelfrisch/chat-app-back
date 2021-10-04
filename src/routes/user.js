import express from 'express'
const router = new express.Router()

router.get('', (req, res) =>{
    res.send('Hello world')
})

module.exports = router