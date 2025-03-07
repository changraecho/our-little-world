import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const generateQuestion = (difficulty) => {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * (difficulty >= 2 ? 3 : 2))];
  
  let num1, num2;
  switch (difficulty) {
    case 1:
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
      break;
    case 2:
      num1 = Math.floor(Math.random() * 20);
      num2 = Math.floor(Math.random() * 20);
      break;
    case 3:
      num1 = Math.floor(Math.random() * 50);
      num2 = Math.floor(Math.random() * (operation === '*' ? 10 : 50));
      break;
    default:
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
  }

  let answer;
  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    default:
      answer = num1 + num2;
  }

  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer: answer,
    options: generateOptions(answer, difficulty)
  };
};

const generateOptions = (answer, difficulty) => {
  const options = [answer];
  const range = difficulty * 5;
  
  while (options.length < 4) {
    const option = answer + (Math.random() < 0.5 ? 1 : -1) * Math.floor(Math.random() * range) + 1;
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  return options.sort(() => Math.random() - 0.5);
};

const MathQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const totalRounds = 10;

  useEffect(() => {
    generateNewQuestion();
  }, [difficulty]);

  const generateNewQuestion = () => {
    setCurrentQuestion(generateQuestion(difficulty));
  };

  const handleAnswer = (answer) => {
    if (gameOver) return;

    const isCorrect = answer === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newRounds = rounds + 1;
    setRounds(newRounds);

    if (newRounds % 3 === 0 && difficulty < 3) {
      setDifficulty(difficulty + 1);
    }

    if (newRounds >= totalRounds) {
      setGameOver(true);
      const finalScore = Math.round((score + (isCorrect ? 1 : 0)) * 10);
      setTimeout(() => onComplete(finalScore), 1000);
    } else {
      generateNewQuestion();
    }
  };

  if (!currentQuestion) return null;

  return (
    <Container>
      <Title>수학 퀴즈</Title>
      <ScoreBoard>
        점수: {score} / {rounds}
        <DifficultyIndicator>난이도: {'⭐'.repeat(difficulty)}</DifficultyIndicator>
      </ScoreBoard>
      <QuestionArea>
        <Question>{currentQuestion.question}</Question>
        <OptionsGrid>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsGrid>
      </QuestionArea>
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
    padding: 15px;
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

const DifficultyIndicator = styled.div`
  color: #ffd700;
  margin-top: 5px;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-top: 3px;
  }
`;

const QuestionArea = styled.div`
  margin: 20px 0;

  @media (max-width: 768px) {
    margin: 15px 0;
  }
`;

const Question = styled.div`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 10px;
    max-width: 100%;
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    max-width: 280px;
  }
`;

const OptionButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px 25px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  touch-action: manipulation;

  &:hover {
    background-color: #357abd;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 1.1rem;
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

export default MathQuiz; 