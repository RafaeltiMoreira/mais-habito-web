import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

// ─── Layout ────────────────────────────────────────────────────────────────

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.4s ease both;
`;

// ─── Header ────────────────────────────────────────────────────────────────

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Greeting = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.3px;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

// ─── Score Cards ────────────────────────────────────────────────────────────

export const ScoreRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ScoreCard = styled.div<{ $isWinning?: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: ${({ $isWinning, theme }) =>
    $isWinning
      ? `linear-gradient(135deg, ${theme.colors.primary}1F 0%, ${theme.colors.primary}0A 100%)`
      : theme.colors.surfaceAlt + '60'};
  border: 1px solid ${({ $isWinning, theme }) =>
    $isWinning ? `${theme.colors.primary}4D` : theme.colors.border};
  border-radius: 14px;
  transition: border-color 0.3s;

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const ScoreAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

export const ScoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const ScoreName = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ScoreValue = styled.p`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1;

  span {
    font-size: 0.6875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-left: 3px;
    letter-spacing: 0.5px;
  }
`;

export const ScoreTasks = styled.p`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

// ─── Challenge Card ─────────────────────────────────────────────────────────

export const ChallengeCard = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  overflow: hidden;
`;

export const ChallengeLabel = styled.p`
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ChallengeName = styled.h3`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.3px;
  margin-top: -6px;
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressTitle = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DaysRemaining = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
  border-radius: 999px;
  transition: width 0.6s ease;
`;

export const ProgressSubtext = styled.p`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ChallengeFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DetailsButton = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

// ─── Quick Tasks ─────────────────────────────────────────────────────────────

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SeeAllLink = styled.a`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const TaskCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}33;
  }
`;

export const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TaskIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PointsBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary}1A;
  padding: 2px 7px;
  border-radius: 999px;
`;

export const TaskCardName = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.3;
`;

export const TaskCardDesc = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CompleteButton = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  padding: 8px;
  background: ${({ $disabled, theme }) => $disabled ? theme.colors.surfaceAlt + '60' : `${theme.colors.primary}1A`};
  border: 1px solid ${({ $disabled, theme }) => $disabled ? theme.colors.border : `${theme.colors.primary}33`};
  border-radius: 7px;
  color: ${({ $disabled, theme }) => $disabled ? theme.colors.textSecondary : theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 600;
  font-family: inherit;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  margin-top: auto;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary}2E;
  }
`;

// ─── Empty State ─────────────────────────────────────────────────────────────

export const EmptyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 24px;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  text-align: center;
`;

export const EmptyIconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EmptyIconCircle = styled.div<{ $active?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ $active, theme }) => $active ? `${theme.colors.primary}26` : theme.colors.surfaceAlt + '60'};
  border: 1px solid ${({ $active, theme }) => $active ? `${theme.colors.primary}4D` : theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textSecondary};
`;

export const EmptyDots = styled.div`
  display: flex;
  gap: 4px;

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.textSecondary};
    animation: ${shimmer} 1.5s ease-in-out infinite;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

export const EmptyTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const EmptySubtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  max-width: 280px;
`;

export const InviteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

// ─── Bottom Cards ────────────────────────────────────────────────────────────

export const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div<{ $locked?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  opacity: ${({ $locked }) => $locked ? 0.6 : 1};
`;

export const InfoCardIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const InfoCardTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const InfoCardDesc = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export const InfoCardButton = styled.button<{ $locked?: boolean }>`
  width: 100%;
  padding: 9px;
  background: ${({ theme }) => theme.colors.surfaceAlt}60;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ $locked, theme }) => $locked ? theme.colors.textSecondary : theme.colors.textPrimary};
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: ${({ $locked }) => $locked ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover:not([disabled]) {
    border-color: ${({ theme }) => theme.colors.primary}4D;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const InfoCardHint = styled.p`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

export const HowItWorksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const HowItWorksItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    margin-top: 5px;
    flex-shrink: 0;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
`;