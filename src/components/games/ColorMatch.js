import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];

const ColorMatch = ({ onComplete }) => {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const totalRounds = 10;

  const shuffleColors = () => {
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    const target = shuffled[0];
    const wrongOptions = shuffled.slice(1, 4);
    const allOptions = [...wrongOptions, target].sort(() => Math.random() - 0.5);
    
    setTargetColor(target);
    setOptions(allOptions);
  };

  useEffect(() => {
    shuffleColors();
  }, []);

  const handleColorClick = (color) => {
    if (gameOver) return;

    const isCorrect = color === targetColor;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newRounds = rounds + 1;
    setRounds(newRounds);

    if (newRounds >= totalRounds) {
      setGameOver(true);
      const finalScore = Math.round((score + (isCorrect ? 1 : 0)) * 10);
      setTimeout(() => onComplete(finalScore), 1000);
    } else {
      shuffleColors();
    }
  };

  return (
    <Container>
      <Title>색깔 맞추기</Title>
      <ScoreBoard>
        점수: {score} / {rounds}
      </ScoreBoard>
      <GameArea>
        <TargetColor style={{ backgroundColor: targetColor }} />
        <OptionsGrid>
          {options.map((color, index) => (
            <ColorOption
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </OptionsGrid>
      </GameArea>
      {gameOver && (
        <GameOverMessage>
          게임 종료! 최종 점수: {score}/{totalRounds}
        </GameOverMessage>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  color: #4a90e2;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const ScoreBoard = styled.div`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const TargetColor = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  max-width: 300px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 10px;
    max-width: 280px;
  }
`;

const ColorOption = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  touch-action: manipulation;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    border-radius: 8px;
  }
`;

const GameOverMessage = styled.div`
  color: #4a90e2;
  font-size: 1.5rem;
  margin-top: 20px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-top: 15px;
  }
`;

export default ColorMatch; 