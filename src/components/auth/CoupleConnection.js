import React, { useState } from 'react';
import styled from 'styled-components';

const CoupleConnection = ({ onComplete }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [mode, setMode] = useState('select'); // 'select', 'create', 'join'

  const generateInviteCode = () => {
    // 실제로는 서버에서 생성해야 하지만, 지금은 임시로 생성
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(code);
  };

  const handleJoin = () => {
    if (inviteCode.length < 4) {
      alert('올바른 초대 코드를 입력해주세요.');
      return;
    }
    console.log('커플 연결 시도:', inviteCode);
    // TODO: 실제 커플 연결 로직 구현
    onComplete();
  };

  return (
    <Container>
      {mode === 'select' && (
        <>
          <Title>커플 연결하기</Title>
          <Description>
            파트너와 함께 특별한 여정을 시작해보세요!
          </Description>
          <ButtonGroup>
            <Button onClick={() => setMode('create')}>
              초대 코드 만들기
            </Button>
            <Button onClick={() => setMode('join')}>
              초대 코드 입력하기
            </Button>
          </ButtonGroup>
        </>
      )}

      {mode === 'create' && (
        <>
          <Title>초대 코드 생성</Title>
          <Description>
            파트너에게 공유할 초대 코드를 생성하세요.
          </Description>
          <ButtonGroup>
            <Button onClick={generateInviteCode}>
              코드 생성하기
            </Button>
          </ButtonGroup>
          {inviteCode && (
            <CodeDisplay>
              초대 코드: <Code>{inviteCode}</Code>
            </CodeDisplay>
          )}
          <BackButton onClick={() => setMode('select')}>
            뒤로 가기
          </BackButton>
        </>
      )}

      {mode === 'join' && (
        <>
          <Title>초대 코드 입력</Title>
          <Description>
            파트너가 공유한 초대 코드를 입력하세요.
          </Description>
          <InputGroup>
            <Input
              type="text"
              placeholder="초대 코드 입력"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              maxLength={6}
            />
            <Button onClick={handleJoin}>
              연결하기
            </Button>
          </InputGroup>
          <BackButton onClick={() => setMode('select')}>
            뒤로 가기
          </BackButton>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357abd;
  }
`;

const BackButton = styled(Button)`
  background-color: #666;
  margin-top: 1rem;

  &:hover {
    background-color: #555;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  letter-spacing: 2px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const CodeDisplay = styled.div`
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const Code = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a90e2;
  letter-spacing: 2px;
`;

export default CoupleConnection;
