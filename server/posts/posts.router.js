const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    // Use Promise.all to fetch images for all posts concurrently
    const postsWithImages = await Promise.all(posts.map(async (post) => {
      const { data: images } = await axios.get(`https://jsonplaceholder.typicode.com/albums/1/photos`);
      return {
        ...post,
        images: images.slice(0, 3).map(image => ({ url: image.thumbnailUrl })), // Limiting to 3 images and using thumbnailUrl
      };
    }));

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts or images:', error);
    res.status(500).json({ error: 'Failed to fetch posts or images' });
  }
});

module.exports = router;

// const express = require('express');
// const axios = require('axios');
// const { fetchPosts } = require('./posts.service');
// const { fetchUserById } = require('../users/users.service');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const posts = await fetchPosts();

//     // Use Promise.all to fetch images for all posts concurrently
//     const postsWithImages = await Promise.all(posts.map(async (post) => {
//       const { data: images } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
//       return {
//         ...post,
//         images: images.map(image => ({ url: image.url })),
//       };
//     }));

//     res.json(postsWithImages);
//   } catch (error) {
//     console.error('Error fetching posts or images:', error);
//     res.status(500).json({ error: 'Failed to fetch posts or images' });
//   }
// });

// module.exports = router;