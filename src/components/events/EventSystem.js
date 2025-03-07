import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EventSystem = ({ age, onDecision }) => {
  const [currentEvent, setCurrentEvent] = useState(null);

  // 나이에 따른 이벤트 생성
  useEffect(() => {
    const events = {
      0: [
        {
          id: 'first-word',
          title: '첫 단어',
          description: '아이가 첫 단어를 말하려고 해요!',
          choices: [
            { id: 'mama', text: '엄마라고 해보자!' },
            { id: 'papa', text: '아빠라고 해보자!' }
          ]
        }
      ],
      1: [
        {
          id: 'walking',
          title: '첫 걸음마',
          description: '아이가 걸음마를 시도하고 있어요!',
          choices: [
            { id: 'help', text: '도와주기' },
            { id: 'watch', text: '지켜보기' }
          ]
        }
      ],
      // 더 많은 나이별 이벤트들...
    };

    const ageEvents = events[age] || [];
    if (ageEvents.length > 0) {
      setCurrentEvent(ageEvents[0]);
    }
  }, [age]);

  const handleChoice = (choiceId) => {
    console.log(`선택된 결정: ${choiceId}`);
    onDecision(currentEvent.id, choiceId);
    setCurrentEvent(null);
  };

  if (!currentEvent) return null;

  return (
    <EventContainer>
      <EventTitle>{currentEvent.title}</EventTitle>
      <EventDescription>{currentEvent.description}</EventDescription>
      <ChoicesContainer>
        {currentEvent.choices.map(choice => (
          <ChoiceButton
            key={choice.id}
            onClick={() => handleChoice(choice.id)}
          >
            {choice.text}
          </ChoiceButton>
        ))}
      </ChoicesContainer>
    </EventContainer>
  );
};

const EventContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, 0);
    }
  }
`;

const EventTitle = styled.h3`
  color: #4a90e2;
  margin-bottom: 10px;
  text-align: center;
`;

const EventDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  text-align: center;
  line-height: 1.5;
`;

const ChoicesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ChoiceButton = styled.button`
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: #4a90e2;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #357abd;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default EventSystem;
