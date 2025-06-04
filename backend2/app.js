const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res) => {
    res.send('Hello from backend2!')
})

app.listen(port, () => {
    console.log(`Backend2 listening on port ${port}`)
})
