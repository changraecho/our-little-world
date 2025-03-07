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
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChildInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Name = styled.h2`
  color: #4a90e2;
  margin-bottom: 10px;
`;

const AgeDisplay = styled.span`
  margin-right: 20px;
  color: #666;
`;

const MoodDisplay = styled.span`
  color: #666;
`;

const CharacterDisplay = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 20px 0;
  animation: ${props => props.isAnimating ? bounce : 'none'} 0.5s ease;
`;

const AgeGroup = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const ChildName = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #666;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 10px;
  margin: 20px 0;
`;

const ActionButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.disabled ? '#ccc' : '#4a90e2'};
  color: white;
  font-size: 0.9rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover:not(:disabled) {
    background-color: #357abd;
    transform: translateY(-2px);
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
