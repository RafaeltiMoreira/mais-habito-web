import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ─── Layout ────────────────────────────────────────────────────────────────

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.4s ease both;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TitleLabel = styled.p`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.3px;
`;

export const ChallengeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ChallengeLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${({ theme }) => theme.colors.primary}1A;
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
  padding: 3px 8px;
  border-radius: 999px;
`;

export const ChallengeName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

// ─── Stats Row ──────────────────────────────────────────────────────────────

export const StatsRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  overflow: hidden;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  width: 100%;
  min-width: 0;
`;

export const FilterTab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 14px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;

  background: ${({ $active, theme }) =>
    $active ? `${theme.colors.primary}1A` : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  border-bottom: 2px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 400px) {
    font-size: 0.6875rem;
    padding: 12px 8px;
  }
`;

export const StatDivider = styled.div`
  width: 1px;
  background: ${({ theme }) => theme.colors.border};
  align-self: stretch;

  @media (max-width: 600px) {
    width: 100%;
    height: 1px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  white-space: nowrap;
`;

export const StatIcon = styled.div`
  color: #FF8C00;
`;

export const StatValue = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatLabel = styled.span`
  font-size: 0.5625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatNumber = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

// ─── Task List ──────────────────────────────────────────────────────────────

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// ─── Motivational Card ──────────────────────────────────────────────────────

export const MotivationalCard = styled.div`
  padding: 40px 32px;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
`;

export const MotivationalIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MotivationalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const MotivationalDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  max-width: 500px;

  em {
    color: ${({ theme }) => theme.colors.primary};
    font-style: italic;
  }
`;

export const MotivationalProgress = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`;

export const MotivationalBar = styled.div`
  height: 6px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.surfaceAlt}80;
  overflow: hidden;
`;

export const MotivationalBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${Math.min($percent, 100)}%`};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  border-radius: 3px;
  transition: width 0.8s ease;
`;

export const MotivationalStatus = styled.p`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// ─── Empty / Error ──────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 56px 24px;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}1A;
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const EmptyTitle = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const EmptySubtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
`;