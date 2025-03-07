import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Toast from '../common/Toast';

const ChildDisplay = ({ name, age, mood, onAction, stats }) => {
  const [toast, setToast] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAction = (actionType) => {
    if (stats.energy < 10) {
      setToast({
        message: "아이가 너무 지쳤어요. 휴식이 필요해요!",
        icon: "😴"
      });
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    const actions = {
      feed: {
        message: "맛있게 먹었어요!",
        icon: "🍼",
        stats: { health: 10, happiness: 5, energy: 5 }
      },
      play: {
        message: "재미있게 놀았어요!",
        icon: "🎮",
        stats: { happiness: 15, energy: -10, sociability: 5 }
      },
      study: {
        message: "열심히 공부했어요!",
        icon: "📚",
        stats: { intelligence: 10, energy: -15 }
      },
      sleep: {
        message: "푹 잘 잤어요!",
        icon: "😴",
        stats: { energy: 30, health: 5 }
      }
    };

    const action = actions[actionType];
    onAction(actionType, action.stats);
    setToast({
      message: action.message,
      icon: action.icon
    });
  };

  return (
    <Container>
      <ChildInfo>
        <Name>{name}</Name>
        <AgeDisplay>나이: {age}세</AgeDisplay>
        <MoodDisplay>기분: {mood}</MoodDisplay>
      </ChildInfo>
      
      <CharacterDisplay isAnimating={isAnimating}>
        <AgeGroup>
          {age <= 2 ? '👶' : age <= 5 ? '🧒' : age <= 12 ? '👦' : '🧑'}
        </AgeGroup>
        <ChildName>{name}</ChildName>
      </CharacterDisplay>

      <ActionButtons>
        <ActionButton onClick={() => handleAction('feed')} disabled={stats.energy < 10}>
          먹이기 🍼
        </ActionButton>
        <ActionButton onClick={() => handleAction('play')} disabled={stats.energy < 10}>
          놀아주기 🎮
        </ActionButton>
        <ActionButton onClick={() => handleAction('study')} disabled={stats.energy < 10}>
          공부하기 📚
        </ActionButton>
        <ActionButton onClick={() => handleAction('sleep')}>
          재우기 😴
        </ActionButton>
      </ActionButtons>

      {toast && (
        <Toast 
          message={toast.message} 
          icon={toast.icon} 
          onClose={() => setToast(null)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ChildInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Name = styled.h2`
  color: #fff;
  margin-bottom: 15px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  letter-spacing: 2px;
`;

const AgeDisplay = styled.span`
  margin-right: 20px;
  color: #a0a8ff;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 1px;
`;

const MoodDisplay = styled.span`
  color: #a0a8ff;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 1px;
`;

const CharacterDisplay = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border-radius: 20px;
  margin: 20px 0;
  animation: ${props => props.isAnimating ? bounce : 'none'} 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
    animation: rotate 10s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const AgeGroup = styled.div`
  font-size: 4rem;
  text-align: center;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
`;

const ChildName = styled.div`
  margin-top: 15px;
  font-size: 1.3rem;
  color: #fff;
  position: relative;
  z-index: 1;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 15px;
  margin: 25px 0;
`;

const sparkle = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
`;

const ActionButton = styled.button`
  padding: 15px;
  border: none;
  border-radius: 15px;
  background: ${props => props.disabled ? 
    'rgba(255, 255, 255, 0.1)' : 
    'linear-gradient(135deg, #4a4eff 0%, #2e3192 100%)'};
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: ${props => props.disabled ? 
    'none' : 
    '0 4px 15px rgba(74, 78, 255, 0.2)'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '✨';
    position: absolute;
    opacity: 0;
    animation: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 78, 255, 0.3);

    &::before {
      animation: ${sparkle} 0.8s ease-in-out infinite;
      opacity: 1;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export default ChildDisplay;
