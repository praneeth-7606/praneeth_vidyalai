import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
  width: '300px',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollSnapType: 'x mandatory',
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
  width: '280px',
  padding: '10px',
  position: 'relative',
}));

const Image = styled.img(() => ({
  width: '100%',
  height: 'auto',
  maxHeight: '300px',
}));

const UserOverlay = styled.div(() => ({
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '3px',
  fontSize: '12px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const getUserInitials = (name) => {
  const parts = name.split(' ');
  return parts.map(part => part.charAt(0)).join('');
};

const Post = ({ post, userList }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: containerWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: -containerWidth,
        behavior: 'smooth',
      });
    }
  };

  const user = userList && Array.isArray(userList)
    ? userList.find(u => u.id === post.userId)
    : null;

  return (
    <PostContainer>
      <CarouselContainer>
        <p></p>
        <div style={{display:"flex",padding:"10px",gap:10}}>
      <Avatar style={{backgroundColor:"purple"}} >OP</Avatar>
      <div>
        <p><strong>Leanne Graham</strong></p>
        <p>Sincere@april.biz</p>
      </div>
      </div>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              {user && (
                <UserOverlay>
                  {user.name} - {user.email}
                </UserOverlay>
              )}
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Post;
