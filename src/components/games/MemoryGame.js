import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const cardEmojis = ['🐶', '🐱', '🐰', '🐼', '🦊', '🐨', '🐯', '🦁'];
const allCards = [...cardEmojis, ...cardEmojis];

const MemoryGame = ({ onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // 게임 시작시 카드 섞기
    const shuffled = allCards
      .map(card => ({
        content: card,
        id: Math.random()
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  useEffect(() => {
    // 두 카드가 뒤집혔을 때 체크
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].content === cards[second].content) {
        setSolved([...solved, first, second]);
        setFlipped([]);
      } else {
        // 1초 후에 카드 다시 뒤집기
        setTimeout(() => setFlipped([]), 1000);
      }
      setMoves(moves + 1);
    }
  }, [flipped]);

  useEffect(() => {
    // 모든 카드가 맞춰졌는지 체크
    if (solved.length === cards.length && cards.length > 0) {
      // 점수 계산 (100점 만점, 이동 횟수에 따라 감점)
      const baseScore = 100;
      const penalty = Math.min(moves - cards.length / 2, baseScore - 20);
      const finalScore = Math.max(baseScore - penalty, 20);
      
      setTimeout(() => onComplete(finalScore), 1000);
    }
  }, [solved]);

  const handleCardClick = (index) => {
    // 이미 뒤집혔거나 맞춰진 카드는 무시
    if (flipped.includes(index) || solved.includes(index) || flipped.length === 2) {
      return;
    }
    setFlipped([...flipped, index]);
  };

  return (
    <Container>
      <Title>카드 짝 맞추기</Title>
      <MovesCounter>이동 횟수: {moves}</MovesCounter>
      <Grid>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(index)}
            isFlipped={flipped.includes(index) || solved.includes(index)}
          >
            <CardInner>
              <CardFront>❓</CardFront>
              <CardBack>{card.content}</CardBack>
            </CardInner>
          </Card>
        ))}
      </Grid>
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

const MovesCounter = styled.div`
  color: #666;
  margin-bottom: 20px;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    max-width: 100%;
    aspect-ratio: 1;
  }
`;

const Card = styled.div`
  aspect-ratio: 1;
  perspective: 1000px;
  cursor: pointer;
  touch-action: manipulation;

  ${({ isFlipped }) => isFlipped && `
    & > div {
      transform: rotateY(180deg);
    }
  `}
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  user-select: none;
  -webkit-user-select: none;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    border-radius: 8px;
  }
`;

const CardFront = styled(CardSide)`
  background-color: #4a90e2;
  color: white;
`;

const CardBack = styled(CardSide)`
  background-color: white;
  transform: rotateY(180deg);
`;

export default MemoryGame; 