import React from 'react';
import styled from 'styled-components';

const Background = ({ age }) => {
  const getBackgroundColor = () => {
    if (age <= 2) return '#FFE4E1'; // 아기방 - 연한 분홍색
    if (age <= 5) return '#E0FFFF'; // 유치원 - 연한 하늘색
    if (age <= 12) return '#F0FFF0'; // 학교 - 연한 초록색
    return '#E6E6FA'; // 청소년방 - 연한 보라색
  };

  return <BackgroundContainer bgColor={getBackgroundColor()} />;
};

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.bgColor};
  opacity: 0.3;
  transition: background-color 1s ease;
  z-index: -1;
`;

export default Background;
