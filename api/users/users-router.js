const express = require('express');
const { get, getById, getUserPosts } = require('./users-model')
const { insert } = require('../posts/posts-model');
const { validateUser, validatePost } = require('../middleware/middleware');


// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const users = await get()
  res.send(users)
});

router.get('/:id', async (req, res) => {
  const user = await getById(req.params.id)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
 res.send(user)
});

router.post('/', validateUser,  async (req, res) => {
  const user = req.body
  res.status(201).send(user)
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',validateUser, async (req, res) => {
  const user = req.body
  res.send(user)
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', async (req, res) => {
  const user = await delete(req.params.id)
  res.send(user)
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', async (req, res) => {
  const posts = await getUserPosts(req.params.id)
  res.send(posts)
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validatePost, async (req, res) => {
  const post = await insert(req.params.id)
  res.send(post)
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router