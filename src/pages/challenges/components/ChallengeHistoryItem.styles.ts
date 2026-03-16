import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 28px;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}33;
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StatusDot = styled.div<{ $cancelled?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $cancelled, theme }) => $cancelled ? theme.colors.textSecondary : theme.colors.primary};
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ItemName = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ItemDate = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
`;

export const WinnerBadge = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ScoreText = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 1px;
`;

export const CancelledBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;