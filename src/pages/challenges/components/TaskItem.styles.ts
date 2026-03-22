import styled from 'styled-components';

export const Item = styled.div<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border: 1px solid ${({ $completed, theme }) => $completed ? theme.colors.border + '60' : theme.colors.border};
  border-radius: 14px;
  gap: 16px;
  transition: border-color 0.2s;
  opacity: ${({ $completed }) => $completed ? 0.6 : 1};

  &:hover {
    border-color: ${({ $completed, theme }) => $completed ? theme.colors.border : theme.colors.primary + '40'};
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    padding: 14px;
    gap: 12px;
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
`;

export const TaskIconBox = styled.div<{ $completed?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex-shrink: 0;
  background: ${({ $completed, theme }) => $completed ? theme.colors.surfaceAlt + '60' : `${theme.colors.primary}1A`};
  border: 1px solid ${({ $completed, theme }) => $completed ? theme.colors.border : `${theme.colors.primary}33`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $completed, theme }) => $completed ? theme.colors.textSecondary : theme.colors.primary};
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const TaskName = styled.p<{ $completed?: boolean }>`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ $completed, theme }) => $completed ? theme.colors.textSecondary : theme.colors.textPrimary};
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    white-space: normal;
    font-size: 0.875rem;
  }
`;

export const TaskDescription = styled.p<{ $completed?: boolean }>`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  opacity: ${({ $completed }) => $completed ? 0.6 : 0.85};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PointsBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => `${theme.colors.primary}1A`};
  padding: 2px 8px;
  border-radius: 999px;
`;

export const CompletionCount = styled.span`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CompletedBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: #4caf50;
  background: rgba(76,175,80,0.1);
  padding: 2px 8px;
  border-radius: 999px;
`;

export const TaskActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    margin-left: auto;
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt}80;
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.primary}40;
  }
`;

export const CompleteButton = styled.button<{ $disabled?: boolean; $completed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ $completed, theme }) =>
    $completed
      ? 'rgba(76,175,80,0.15)'
      : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`};
  color: ${({ $completed }) => $completed ? '#4caf50' : '#fff'};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ $disabled }) => $disabled ? 0.4 : 1};
  transition: opacity 0.2s, transform 0.1s;

  &:hover {
    opacity: ${({ $disabled }) => $disabled ? 0.4 : 0.85};
    transform: ${({ $disabled }) => $disabled ? 'none' : 'scale(1.05)'};
  }
`;