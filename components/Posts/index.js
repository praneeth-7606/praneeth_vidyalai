import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(0); // Track the starting index of posts to load
  const [limit, setLimit] = useState(10); // Number of posts to load per request
  const [hasMore, setHasMore] = useState(true); // Whether there are more posts to load

  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    fetchPosts();
  }, [isSmallerDevice]); // Fetch posts initially and whenever isSmallerDevice changes

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/v1/posts', {
        params: { start, limit: isSmallerDevice ? 5 : 10 },
      });

      if (data.length === 0) {
        setHasMore(false); // No more posts to load
      } else {
        setPosts([...posts, ...data]); // Append new posts to the existing list
        setStart(start + limit); // Update the starting index for the next fetch
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fetchPosts();
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
