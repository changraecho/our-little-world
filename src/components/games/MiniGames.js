import React, { useState } from 'react';
import styled from 'styled-components';
import MemoryGame from './MemoryGame';
import ColorMatch from './ColorMatch';
import MathQuiz from './MathQuiz';

const games = {
  memory: {
    id: 'memory',
    title: '카드 짝 맞추기',
    description: '같은 그림의 카드를 찾아보세요!',
    minAge: 3,
    effects: {
      intelligence: 5,
      happiness: 3,
      energy: -5
    }
  },
  colorMatch: {
    id: 'colorMatch',
    title: '색깔 맞추기',
    description: '같은 색깔을 찾아보세요!',
    minAge: 2,
    effects: {
      creativity: 5,
      happiness: 3,
      energy: -3
    }
  },
  mathQuiz: {
    id: 'mathQuiz',
    title: '수학 퀴즈',
    description: '간단한 수학 문제를 풀어보세요!',
    minAge: 5,
    effects: {
      intelligence: 8,
      logic: 5,
      energy: -8
    }
  }
};

const MiniGames = ({ age, onGameComplete }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameComplete = (gameId, score) => {
    const game = games[gameId];
    const effects = { ...game.effects };
    
    // 점수에 따라 효과 조정
    const multiplier = score / 100; // 점수를 0-100 기준으로 가정
    Object.keys(effects).forEach(key => {
      effects[key] = Math.round(effects[key] * multiplier);
    });

    onGameComplete(gameId, score, effects);
    setSelectedGame(null);
  };

  const availableGames = Object.values(games).filter(game => age >= game.minAge);

  if (selectedGame) {
    switch (selectedGame) {
      case 'memory':
        return <MemoryGame onComplete={(score) => handleGameComplete('memory', score)} />;
      case 'colorMatch':
        return <ColorMatch onComplete={(score) => handleGameComplete('colorMatch', score)} />;
      case 'mathQuiz':
        return <MathQuiz onComplete={(score) => handleGameComplete('mathQuiz', score)} />;
      default:
        return null;
    }
  }

  return (
    <Container>
      <Title>미니게임</Title>
      <Description>아이와 함께 게임을 즐겨보세요!</Description>
      <GamesGrid>
        {availableGames.map(game => (
          <GameCard key={game.id} onClick={() => setSelectedGame(game.id)}>
            <GameIcon>
              {game.id === 'memory' && '🃏'}
              {game.id === 'colorMatch' && '🎨'}
              {game.id === 'mathQuiz' && '🔢'}
            </GameIcon>
            <GameTitle>{game.title}</GameTitle>
            <GameDescription>{game.description}</GameDescription>
          </GameCard>
        ))}
      </GamesGrid>
    </Container>
  );
};

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    margin: 15px 0;
    border-radius: 12px;
  }
`;

const Title = styled.h2`
  color: #4a90e2;
  text-align: center;
  margin-bottom: 10px;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Description = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 5px;
  }
`;

const GameCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const GameIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const GameTitle = styled.h3`
  color: #4a90e2;
  margin-bottom: 10px;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const GameDescription = styled.p`
  color: #666;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export default MiniGames; 