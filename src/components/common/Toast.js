import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Toast = ({ message, icon, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer>
      <span>{icon}</span>
      {message}
    </ToastContainer>
  );
};

const slideIn = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1000;
`;

export default Toast;
