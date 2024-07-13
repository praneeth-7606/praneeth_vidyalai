// ExampleComponent.js
import React from 'react';
import { useWindowWidth } from './WindowWidthContext';

const ExampleComponent = () => {
  const { isSmallerDevice } = useWindowWidth();

  return (
    <div>
      {isSmallerDevice ? <p>You're on a smaller device</p> : <p>You're on a larger device</p>}
    </div>
  );
};

export default ExampleComponent;
