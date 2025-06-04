const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('Hello from backend1!')
})

app.listen(port, () => {
    console.log(`Backend1 listening on port ${port}`)
})
