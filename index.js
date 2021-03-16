// require your server and launch it
const PORT = 5000
const server = require('./api/server')
server.listen(PORT, () => console.log( `Server is up on port ${PORT}`))