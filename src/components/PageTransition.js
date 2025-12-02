import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionState, setTransitionState] = useState('enter');

  useEffect(() => {
    // Start exit animation
    setTransitionState('exit');
    
    // After exit animation, update children and start enter animation
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionState('enter');
    }, 200); // Match this with CSS transition duration

    return () => clearTimeout(timeout);
  }, [location.pathname, children]);

  return (
    <div className={`page-transition page-transition--${transitionState}`}>
      {displayChildren}
    </div>
  );
};

export default PageTransition;
