import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post'; // Adjust import path if necessary

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('/api/v1/users');
        setUsers(userResponse.data);

        const postResponse = await axios.get('/api/v1/posts');
        setPosts(postResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} userList={users} />
      ))}
    </div>
  );
};

export default App;
