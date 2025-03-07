import React from 'react';
import styled from 'styled-components';

const ChildStatus = ({ personality, stats }) => {
  return (
    <Container>
      <Section>
        <SectionTitle>성격</SectionTitle>
        <Grid>
          <StatItem>
            <StatLabel>사회성</StatLabel>
            <ProgressBar value={personality.sociability} />
            <StatValue>{personality.sociability}%</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>창의성</StatLabel>
            <ProgressBar value={personality.creativity} />
            <StatValue>{personality.creativity}%</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>논리력</StatLabel>
            <ProgressBar value={personality.logic} />
            <StatValue>{personality.logic}%</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>감수성</StatLabel>
            <ProgressBar value={personality.sensitivity} />
            <StatValue>{personality.sensitivity}%</StatValue>
          </StatItem>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>상태</SectionTitle>
        <Grid>
          <StatItem>
            <StatLabel>건강</StatLabel>
            <ProgressBar value={stats.health} color="#FF6B6B" />
            <StatValue>{stats.health}%</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>행복</StatLabel>
            <ProgressBar value={stats.happiness} color="#FFD93D" />
            <StatValue>{stats.happiness}%</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>지능</StatLabel>
            <ProgressBar value={stats.intelligence} color="#4ECDC4" />
            <StatValue>{stats.intelligence}%</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>에너지</StatLabel>
            <ProgressBar value={stats.energy} color="#95E1D3" />
            <StatValue>{stats.energy}%</StatValue>
          </StatItem>
        </Grid>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 12px;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const SectionTitle = styled.h3`
  color: #4a90e2;
  margin-bottom: 15px;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
`;

const StatLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatValue = styled.span`
  color: #333;
  font-size: 0.8rem;
  text-align: right;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.value}%;
    background-color: ${props => props.color || '#4a90e2'};
    transition: width 0.3s ease;
  }

  @media (max-width: 768px) {
    height: 6px;
  }
`;

export default ChildStatus;
