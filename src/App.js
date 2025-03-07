import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import CoupleConnection from './components/auth/CoupleConnection';
import ChildDisplay from './components/child/ChildDisplay';
import EventSystem from './components/events/EventSystem';
import ChildStatus from './components/child/ChildStatus';
import MemoryAlbum from './components/album/MemoryAlbum';
import Background from './components/common/Background';
import Achievements from './components/stats/Achievements';
import GrowthEvents from './components/events/GrowthEvents';
import MiniGames from './components/games/MiniGames';

const floatObject = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, 10px) rotate(90deg); }
  50% { transform: translate(0, 20px) rotate(180deg); }
  75% { transform: translate(-10px, 10px) rotate(270deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }

  button {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Black Han Sans', sans-serif;
  }
`;

function AppContent() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCoupleConnected, setIsCoupleConnected] = useState(false);
  const [memories, setMemories] = useState([]);
  const [showAlbum, setShowAlbum] = useState(false);
  
  // 아이 상태 관리
  const [childData, setChildData] = useState({
    name: "우리 아이",
    age: 0,
    mood: "행복해요 😊",
    personality: {
      sociability: 50,
      creativity: 50,
      logic: 50,
      sensitivity: 50
    },
    stats: {
      health: 100,
      happiness: 100,
      intelligence: 50,
      energy: 100,
      events: []
    }
  });

  // 시간 시스템 (테스트를 위해 10초를 1년으로 설정)
  useEffect(() => {
    if (isCoupleConnected) {
      const timer = setInterval(() => {
        setChildData(prev => ({
          ...prev,
          age: prev.age + 1,
          stats: {
            ...prev.stats,
            energy: Math.max(prev.stats.energy - 5, 0), // 시간이 지날수록 체력 감소
            happiness: Math.max(prev.stats.happiness - 2, 0) // 시간이 지날수록 행복도 소폭 감소
          }
        }));
      }, 10000);

      return () => clearInterval(timer);
    }
  }, [isCoupleConnected]);

  const handleAction = (actionType, changes) => {
    setChildStats(prev => ({
      ...prev,
      events: prev.events || [], // events 배열이 없으면 빈 배열로 초기화
      stats: {
        ...prev.stats,
        // 각 스탯 값을 0-100 사이로 제한
        health: Math.min(Math.max((prev.stats.health || 0) + (changes.health || 0), 0), 100),
        happiness: Math.min(Math.max((prev.stats.happiness || 0) + (changes.happiness || 0), 0), 100),
        intelligence: Math.min(Math.max((prev.stats.intelligence || 0) + (changes.intelligence || 0), 0), 100),
        energy: Math.min(Math.max((prev.stats.energy || 0) + (changes.energy || 0), 0), 100)
      }
    }));

    // childData도 함께 업데이트
    setChildData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        ...changes
      }
    }));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleCoupleConnection = () => {
    setIsCoupleConnected(true);
  };

  // 새로운 추억 추가 함수
  const addMemory = (memory) => {
    setMemories(prev => [...prev, {
      id: Date.now(),
      date: new Date(),
      age: childData.age,
      ...memory
    }]);
  };

  // 이벤트 결정 시 추억 추가
  const handleEventDecision = (eventId, choiceId, effects = null) => {
    // childStats 업데이트
    setChildStats(prev => ({
      ...prev,
      events: [...(prev.events || []), { id: eventId, choice: choiceId }]
    }));

    // childData 업데이트 (성장 이벤트의 효과 포함)
    setChildData(prev => {
      const newStats = {
        ...prev.stats,
        events: [...(prev.stats.events || []), { id: eventId, choice: choiceId }]
      };

      // 성장 이벤트의 효과 적용
      if (effects) {
        const { personality: prevPersonality, stats: prevStats } = prev;
        
        // 성격 효과 적용
        const newPersonality = { ...prevPersonality };
        for (const [trait, value] of Object.entries(effects)) {
          if (['sociability', 'creativity', 'logic', 'sensitivity'].includes(trait)) {
            newPersonality[trait] = Math.min(Math.max(newPersonality[trait] + value, 0), 100);
          }
        }

        // 스탯 효과 적용
        for (const [stat, value] of Object.entries(effects)) {
          if (['health', 'happiness', 'intelligence', 'energy'].includes(stat)) {
            newStats[stat] = Math.min(Math.max(newStats[stat] + value, 0), 100);
          }
        }

        return {
          ...prev,
          stats: newStats,
          personality: newPersonality
        };
      }

      return {
        ...prev,
        stats: newStats
      };
    });

    // 추억 추가
    const eventMemories = {
      'first-word': {
        title: '첫 단어',
        icon: '🗣️',
        description: choiceId === 'mama' ? 
          '"엄마"라는 첫 단어를 말했어요!' : 
          '"아빠"라는 첫 단어를 말했어요!',
        choice: choiceId === 'mama' ? '엄마라고 해보자!' : '아빠라고 해보자!'
      },
      'walking': {
        title: '첫 걸음마',
        icon: '🚶‍♂️',
        description: choiceId === 'help' ?
          '도움을 받으며 첫 걸음마를 시작했어요!' :
          '혼자서 용감하게 첫 걸음을 내딛었어요!',
        choice: choiceId === 'help' ? '도와주기' : '지켜보기'
      },
      'kindergarten': {
        title: '유치원 입학',
        icon: '🏫',
        description: choiceId === 'art' ?
          '예술 중심 유치원에서 창의력을 키우기로 했어요!' :
          '몬테소리 유치원에서 논리력을 키우기로 했어요!',
        choice: choiceId === 'art' ? '예술 중심 유치원' : '몬테소리 유치원'
      },
      'elementary': {
        title: '초등학교 입학',
        icon: '📚',
        description: choiceId === 'study' ?
          '공부에 집중하여 실력을 쌓기로 했어요!' :
          '친구들과 어울리며 사회성을 키우기로 했어요!',
        choice: choiceId === 'study' ? '공부에 집중하기' : '친구 사귀기'
      },
      'middle': {
        title: '중학교 입학',
        icon: '🎵',
        description: choiceId === 'sports' ?
          '운동부에 가입하여 건강한 생활을 시작했어요!' :
          '음악부에 가입하여 예술적 감성을 키우기로 했어요!',
        choice: choiceId === 'sports' ? '운동부 가입' : '음악부 가입'
      }
    };

    if (eventMemories[eventId]) {
      addMemory(eventMemories[eventId]);
    }
  };

  const handleGameComplete = (gameId, score, effects) => {
    // 게임 효과 적용
    setChildData(prev => {
      const newStats = { ...prev.stats };
      const newPersonality = { ...prev.personality };

      // 스탯 효과 적용
      for (const [stat, value] of Object.entries(effects)) {
        if (['health', 'happiness', 'intelligence', 'energy'].includes(stat)) {
          newStats[stat] = Math.min(Math.max(newStats[stat] + value, 0), 100);
        }
      }

      // 성격 효과 적용
      for (const [trait, value] of Object.entries(effects)) {
        if (['sociability', 'creativity', 'logic', 'sensitivity'].includes(trait)) {
          newPersonality[trait] = Math.min(Math.max(newPersonality[trait] + value, 0), 100);
        }
      }

      return {
        ...prev,
        stats: newStats,
        personality: newPersonality
      };
    });

    // 게임 기록 추가
    const gameMemories = {
      memory: {
        title: '카드 짝 맞추기',
        icon: '🃏',
        description: `카드 짝 맞추기 게임에서 ${score}점을 획득했어요!`,
      },
      colorMatch: {
        title: '색깔 맞추기',
        icon: '🎨',
        description: `색깔 맞추기 게임에서 ${score}점을 획득했어요!`,
      },
      mathQuiz: {
        title: '수학 퀴즈',
        icon: '🔢',
        description: `수학 퀴즈에서 ${score}점을 획득했어요!`,
      }
    };

    if (gameMemories[gameId]) {
      addMemory(gameMemories[gameId]);
    }
  };

  const [childStats, setChildStats] = useState({
    events: [], // 빈 배열로 초기화
    stats: {
      health: 100,
      happiness: 100,
      intelligence: 50,
      energy: 100
    },
    personality: {
      sociability: 50,
      creativity: 50,
      logic: 50,
      sensitivity: 50
    }
  });

  return (
    <Container>
      <div className="satellite">🛸</div>
      <div className="comet">☄️</div>
      <Background age={childData.age} />
      <Header>
        <Title>우리의 작은 세계</Title>
      </Header>
      <MainContent>
        {!isLoggedIn ? (
          isLoginView ? (
            <LoginForm 
              onSwitchToRegister={() => setIsLoginView(false)}
              onLoginSuccess={handleLogin}
            />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLoginView(true)} />
          )
        ) : !isCoupleConnected ? (
          <CoupleConnection onComplete={handleCoupleConnection} />
        ) : (
          <>
            <ChildDisplay 
              {...childData} 
              onAction={handleAction}
              stats={childData.stats}
            />
            <ChildStatus 
              personality={childData.personality}
              stats={childData.stats}
            />
            <GrowthEvents 
              age={childData.age}
              onDecision={handleEventDecision}
              childStats={childStats}
            />
            <MiniGames
              age={childData.age}
              onGameComplete={handleGameComplete}
            />
            <EventSystem 
              age={childData.age}
              onDecision={handleEventDecision}
            />
            <Achievements childStats={childStats} />
            <AlbumButton onClick={() => setShowAlbum(!showAlbum)}>
              {showAlbum ? '앨범 닫기' : '추억 앨범 보기'} 📸
            </AlbumButton>
            {showAlbum && <MemoryAlbum memories={memories} />}
          </>
        )}
      </MainContent>
    </Container>
  );
}

// 메인 App 컴포넌트
function App() {
  return (
    <>
      <GlobalStyle />
      <AppContent />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #1a1b4b, #0f1033);
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0));
    background-repeat: repeat;
    animation: twinkle 5s ease-in-out infinite alternate;
    opacity: 0.3;
    z-index: 0;
  }

  &::after {
    content: '🚀';
    position: fixed;
    font-size: 2rem;
    top: 20%;
    right: -50px;
    animation: ${floatObject} 20s linear infinite;
  }

  .satellite {
    content: '🛸';
    position: fixed;
    font-size: 2rem;
    bottom: 30%;
    left: -50px;
    animation: ${floatObject} 25s linear infinite;
    animation-delay: -5s;
  }

  .comet {
    content: '☄️';
    position: fixed;
    font-size: 2rem;
    top: 40%;
    left: 50%;
    animation: ${floatObject} 15s linear infinite;
    animation-delay: -10s;
  }

  @keyframes twinkle {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 0.6;
    }
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.8rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  font-weight: 400;
  letter-spacing: 1px;
  position: relative;
  font-family: 'Black Han Sans', sans-serif;
  text-align: center;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    letter-spacing: 0px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 320px) {
    font-size: 1.5rem;
    white-space: nowrap;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(to right, transparent, #a0a8ff, transparent);
  }
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 1;
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const StartButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357abd;
  }
`;

const AlbumButton = styled.button`
  background: linear-gradient(135deg, #4a4eff 0%, #2e3192 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin: 20px 0;
  box-shadow: 0 4px 15px rgba(74, 78, 255, 0.2);
  font-weight: 600;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 78, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    padding: 15px 10px;
  }
`;

export default App;
