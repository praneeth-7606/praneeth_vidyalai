import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get('/api/v1/users'),
          axios.get('/api/v1/posts'),
        ]);
        setUsers(usersResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} users={users} />
      ))}
    </div>
  );
};

export default UserList;
