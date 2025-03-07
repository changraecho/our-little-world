import React from 'react';
import styled, { keyframes } from 'styled-components';

const Background = ({ age }) => {
  const getConstellation = (age) => {
    if (age <= 2) return '♈'; // 양자리 (아기)
    if (age <= 5) return '♌'; // 사자자리 (유아)
    if (age <= 12) return '♐'; // 궁수자리 (아동)
    return '♒'; // 물병자리 (청소년)
  };

  return (
    <BackgroundContainer>
      <Constellation>{getConstellation(age)}</Constellation>
      <Planet1 />
      <Planet2 />
      <ShootingStar />
    </BackgroundContainer>
  );
};

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

const shootingStar = keyframes`
  0% {
    transform: translateX(0) translateY(0) rotate(45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(1000px) translateY(1000px) rotate(45deg);
    opacity: 0;
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

const Constellation = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15rem;
  color: rgba(255, 255, 255, 0.1);
  animation: ${float} 10s ease-in-out infinite;
  text-shadow: 0 0 50px rgba(255, 255, 255, 0.3);
`;

const Planet = styled.div`
  position: fixed;
  border-radius: 50%;
  animation: ${float} 15s ease-in-out infinite;
`;

const Planet1 = styled(Planet)`
  top: 20%;
  right: 15%;
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #ff6b6b, #ffd93d);
  opacity: 0.2;
  animation-delay: -2s;
`;

const Planet2 = styled(Planet)`
  bottom: 15%;
  left: 10%;
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #4ecdc4, #45b7d1);
  opacity: 0.15;
  animation-delay: -5s;
`;

const ShootingStar = styled.div`
  position: fixed;
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, rgba(255,255,255,0.8), transparent);
  top: 20%;
  left: -100px;
  animation: ${shootingStar} 5s linear infinite;
  animation-delay: ${() => Math.random() * 5}s;

  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default Background;
