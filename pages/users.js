import React from 'react';
import Footer from '../components/Footer';
import TopNavbar from '../components/Navbar';
import UserList from '../components/UserList';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Full-width Navbar */}
      <TopNavbar style={{ width: '100%' }} />
      
      <div style={{ flex: 1, margin: '60px 0px 20px' }}>
        <UserList />
      </div>
      
      {/* Full-width Footer */}
      <Footer style={{ width: '100%' }} />
    </div>
  );
}
