// src/components/ScrollToTop.js

import React, { useState, useEffect } from 'react';
import Icon from '../../utils/IconSection';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Colors from '../../constants/colors';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop} style={styles.icon}>
          <Icon icon={faArrowUp} />
        </div>
      )}
    </div>
  );
};

const styles = {
  icon: {
    position: 'fixed',
    bottom: '5px',
    right: '20px',
    backgroundColor: Colors.black_000000,
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 1000,
  },
};

export default ScrollToTop;
