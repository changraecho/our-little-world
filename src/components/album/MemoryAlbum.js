import React, { useState } from 'react';
import styled from 'styled-components';

const MemoryAlbum = ({ memories }) => {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container>
      <Title>추억 앨범</Title>
      <AlbumGrid>
        {memories.map((memory) => (
          <MemoryCard 
            key={memory.id} 
            onClick={() => setSelectedMemory(memory)}
          >
            <MemoryIcon>{memory.icon}</MemoryIcon>
            <MemoryTitle>{memory.title}</MemoryTitle>
            <MemoryDate>{formatDate(memory.date)}</MemoryDate>
          </MemoryCard>
        ))}
      </AlbumGrid>

      {selectedMemory && (
        <MemoryModal onClick={() => setSelectedMemory(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <h2>{selectedMemory.title}</h2>
              <CloseButton onClick={() => setSelectedMemory(null)}>✕</CloseButton>
            </ModalHeader>
            <ModalBody>
              <MemoryIconLarge>{selectedMemory.icon}</MemoryIconLarge>
              <MemoryDescription>{selectedMemory.description}</MemoryDescription>
              <MemoryDetails>
                <span>나이: {selectedMemory.age}세</span>
                <span>{formatDate(selectedMemory.date)}</span>
              </MemoryDetails>
              {selectedMemory.choice && (
                <ChoiceInfo>
                  선택한 결정: {selectedMemory.choice}
                </ChoiceInfo>
              )}
            </ModalBody>
          </ModalContent>
        </MemoryModal>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #4a90e2;
  margin-bottom: 20px;
  text-align: center;
`;

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
`;

const MemoryCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const MemoryIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const MemoryTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const MemoryDate = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const MemoryModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #4a90e2;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  text-align: center;
`;

const MemoryIconLarge = styled.div`
  font-size: 4rem;
  margin: 20px 0;
`;

const MemoryDescription = styled.p`
  color: #333;
  line-height: 1.6;
  margin: 20px 0;
`;

const MemoryDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  margin-top: 20px;
`;

const ChoiceInfo = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  color: #666;
`;

export default MemoryAlbum;
