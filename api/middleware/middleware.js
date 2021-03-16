const { getById } = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  const time = new Date()
  const  format =
  time.getFullYear() +
    "-" +
    (time.getMonth() + 1) +
    "-" +
    time.getDate() +
    " " +
    time.getHours() +
    ":" +
    time.getMinutes() +
    ":" +
    time.getSeconds();
  const type = req.method
  const url = req.url
  const status = res.statusCode
  const logging = `[${format}] ${type} ${url} ${status}`
    console.log(logging)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const id = req.body.id
  try {
    if(id) {
   const user = getById(id)
   return user
  }
  } catch (err) {
    res.status(404).send()
  }
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body) {
    res.status(400).json({message: "missing user data" })
  }
  if(!req.body.name) {
    res.status(400).json({message: "missing required name field" })
  }
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
   if (!req.body) {
    res.status(400).json({message: "missing post data" })
  }
  if(!req.body.text) {
    res.status(400).json({message: "missing required text field" })
  }
  next()
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser, validatePost}