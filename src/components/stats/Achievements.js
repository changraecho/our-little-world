import React from 'react';
import styled from 'styled-components';

const achievements = {
  firstWord: {
    id: 'firstWord',
    title: '첫 말하기',
    icon: '🗣️',
    description: '아이의 첫 단어를 들었어요!',
    condition: (stats) => stats?.events?.includes('first-word') || false
  },
  walking: {
    id: 'walking',
    title: '첫 걸음마',
    icon: '🚶',
    description: '아이가 처음으로 걸었어요!',
    condition: (stats) => stats?.events?.includes('walking') || false
  },
  happy: {
    id: 'happy',
    title: '행복한 아이',
    icon: '😊',
    description: '행복도가 90% 이상이에요!',
    condition: (stats) => stats?.stats?.happiness >= 90 || false
  },
  smart: {
    id: 'smart',
    title: '똑똑한 아이',
    icon: '🧠',
    description: '지능이 80% 이상이에요!',
    condition: (stats) => stats?.stats?.intelligence >= 80 || false
  },
  healthy: {
    id: 'healthy',
    title: '건강한 아이',
    icon: '💪',
    description: '건강도가 95% 이상이에요!',
    condition: (stats) => stats?.stats?.health >= 95 || false
  }
};

const Achievements = ({ childStats }) => {
  const unlockedAchievements = Object.values(achievements).filter(achievement => 
    childStats && achievement.condition(childStats)
  );

  return (
    <Container>
      <Title>우리 아이의 업적</Title>
      <AchievementGrid>
        {Object.values(achievements).map(achievement => (
          <AchievementCard 
            key={achievement.id}
            unlocked={childStats && achievement.condition(childStats)}
          >
            <AchievementIcon>
              {childStats && achievement.condition(childStats) ? achievement.icon : '🔒'}
            </AchievementIcon>
            <AchievementTitle>
              {achievement.title}
            </AchievementTitle>
            <AchievementDescription>
              {achievement.description}
            </AchievementDescription>
          </AchievementCard>
        ))}
      </AchievementGrid>
      <Progress>
        달성률: {Math.round((unlockedAchievements.length / Object.keys(achievements).length) * 100)}%
      </Progress>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #4a90e2;
  text-align: center;
  margin-bottom: 20px;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const AchievementCard = styled.div`
  background-color: ${props => props.unlocked ? '#f0f9ff' : '#f5f5f5'};
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: ${props => props.unlocked ? 'translateY(-5px)' : 'none'};
  }
`;

const AchievementIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const AchievementTitle = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const AchievementDescription = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const Progress = styled.div`
  text-align: center;
  font-weight: bold;
  color: #4a90e2;
`;

export default Achievements;
