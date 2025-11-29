import React, { useState, useEffect } from 'react';
import { Tab, TabBar, TabButton } from './styles';

const StickyTabBar = () => {
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldStickToTop = window.scrollY > 50;
      setIsTop(shouldStickToTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <TabBar isTop={isTop}>
      <Tab><TabButton>일정표</TabButton></Tab>
      <Tab><TabButton>가이드북</TabButton></Tab>
    </TabBar>
  );
};

export default StickyTabBar;
