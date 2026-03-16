export {
  Overlay,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ErrorMessage,
} from './CreateChallengeModal.styles';

import styled from 'styled-components';

export const Modal = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Description = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export const ChallengeName = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4px;
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const AbandonActionBtn = styled.button`
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.error}, #cc0000);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
