import React, { useState } from 'react';
import styled from 'styled-components';

const growthEvents = {
  3: {
    id: 'kindergarten',
    title: '유치원 입학',
    description: '유치원에 입학할 나이가 되었어요! 어떤 유치원을 선택할까요?',
    choices: [
      {
        id: 'art',
        text: '예술 중심 유치원',
        effects: {
          creativity: 10,
          sensitivity: 5,
          intelligence: 3
        }
      },
      {
        id: 'montessori',
        text: '몬테소리 유치원',
        effects: {
          logic: 10,
          sociability: 5,
          intelligence: 3
        }
      }
    ]
  },
  6: {
    id: 'elementary',
    title: '초등학교 입학',
    description: '드디어 초등학교에 입학하는 날이에요!',
    choices: [
      {
        id: 'study',
        text: '공부에 집중하기',
        effects: {
          intelligence: 10,
          logic: 5,
          sociability: -2
        }
      },
      {
        id: 'friends',
        text: '친구 사귀기에 집중하기',
        effects: {
          sociability: 10,
          happiness: 5,
          intelligence: -2
        }
      }
    ]
  },
  12: {
    id: 'middle',
    title: '중학교 입학',
    description: '중학생이 되었어요. 어떤 방과후 활동을 할까요?',
    choices: [
      {
        id: 'sports',
        text: '운동부 가입하기',
        effects: {
          health: 10,
          sociability: 5,
          energy: -3
        }
      },
      {
        id: 'music',
        text: '음악부 가입하기',
        effects: {
          creativity: 10,
          sensitivity: 5,
          energy: -3
        }
      }
    ]
  }
};

const GrowthEvents = ({ age, onDecision, childStats }) => {
  const [selectedParent, setSelectedParent] = useState(null);
  const currentEvent = growthEvents[age];

  // 이미 선택한 이벤트인지 확인
  const isEventCompleted = (eventId) => {
    return childStats?.events?.some(event => event.id === eventId);
  };

  if (!currentEvent || isEventCompleted(currentEvent.id)) return null;

  const handleChoice = (choiceId, effects) => {
    if (selectedParent) {
      // 이미 한 부모가 선택했다면, 다른 부모의 선택만 허용
      onDecision(currentEvent.id, choiceId, effects);
      setSelectedParent(null); // 선택 완료 후 초기화
    } else {
      // 첫 번째 부모의 선택
      setSelectedParent('first');
      alert('다른 부모님도 선택해주세요!');
    }
  };

  return (
    <EventContainer>
      <EventTitle>🎉 특별한 성장 이벤트! 🎉</EventTitle>
      <EventHeader>{currentEvent.title}</EventHeader>
      <EventDescription>{currentEvent.description}</EventDescription>
      <ChoicesContainer>
        {currentEvent.choices.map(choice => (
          <ChoiceButton
            key={choice.id}
            onClick={() => handleChoice(choice.id, choice.effects)}
            disabled={selectedParent === 'second'} // 두 번째 선택 후에는 버튼 비활성화
          >
            {choice.text}
          </ChoiceButton>
        ))}
      </ChoicesContainer>
      {selectedParent === 'first' && (
        <ParentGuide>
          다른 부모님의 선택을 기다리고 있어요...
        </ParentGuide>
      )}
    </EventContainer>
  );
};

const EventContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const EventTitle = styled.h2`
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.5rem;
`;

const EventHeader = styled.h3`
  color: #4a90e2;
  text-align: center;
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const EventDescription = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const ChoicesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const ChoiceButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
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

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ParentGuide = styled.p`
  color: #ff6b6b;
  text-align: center;
  margin-top: 15px;
  font-size: 1rem;
  font-style: italic;
`;

export default GrowthEvents; 