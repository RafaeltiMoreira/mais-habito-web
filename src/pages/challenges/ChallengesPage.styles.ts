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
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.3px;
  text-transform: uppercase;

  &::after {
    content: '';
    display: block;
    width: 48px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    margin-top: 6px;
  }
`;

export const TitleSub = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const StreakBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
  border-radius: 12px;
  white-space: nowrap;

  svg { color: #FF8C00; flex-shrink: 0; }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    order: 2;
  }
`;

export const StreakText = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
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
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    order: 1;
  }
`;

/** Two-column grid */
export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AsideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 900px) {
    display: none;
  }
`;

// ─── Section / Label ────────────────────────────────────────────────────────

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionLabel = styled.p`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const SectionTitle = styled.h3`
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

// ─── Active Challenge Card (main) ───────────────────────────────────────────

export const ChallengeCardMain = styled.div`
  padding: 28px;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ChallengeTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ChallengeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const ChallengeActiveBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const ChallengeTitleMain = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.3;
`;

export const ChallengeDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

export const ProgressCircle = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

export const ProgressValue = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
`;

export const ProgressUnit = styled.p`
  font-size: 0.5625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Progress bar
export const ProgressBarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProgressDates = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ProgressBarTrack = styled.div`
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.surfaceAlt}80;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${Math.min($percent, 100)}%`};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  border-radius: 4px;
  transition: width 0.8s ease;
`;

// Daily log
export const DailyLogSection = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const DailyLogTitle = styled.p`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const DailyLogButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const DailyLogButton = styled.button<{ $variant?: 'success' | 'skip' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  background: ${({ $variant, theme }) =>
    $variant === 'success' ? `${theme.colors.primary}1A` : `${theme.colors.surfaceAlt}60`};
  border: 1px solid ${({ $variant, theme }) =>
    $variant === 'success' ? `${theme.colors.primary}4D` : theme.colors.border};
  color: ${({ $variant, theme }) =>
    $variant === 'success' ? theme.colors.primary : theme.colors.textSecondary};

  &:hover {
    opacity: 0.8;
  }
`;

export const AbandonButton = styled.button`
  width: 100%;
  padding: 14px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary}4D;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}0F;
  }
`;

// Momentum & Reward cards row
export const InsightRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InsightCard = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InsightIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;

export const InsightTitle = styled.p`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const InsightDesc = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

// ─── Aside: History ─────────────────────────────────────────────────────────

export const AsideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AsideTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const AsideSeeAll = styled.a`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover { opacity: 0.7; }
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const HistoryCard = styled.div`
  padding: 18px;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HistoryCardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const HistoryCardIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surfaceAlt}60;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const HistoryBadge = styled.span<{ $status?: string }>`
  font-size: 0.5625rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ $status, theme }) => {
    if ($status === 'COMPLETED') return `
      background: ${theme.colors.primary}26;
      color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary}40;
    `;
    return `
      background: #FF8C001A;
      color: #FF8C00;
      border: 1px solid #FF8C0040;
    `;
  }}
`;

export const HistoryCardTitle = styled.p`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const HistoryCardDesc = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const HistoryCardDate = styled.p`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// ─── CTA ─────────────────────────────────────────────────────────────────────

export const CTACard = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}12, ${({ theme }) => theme.colors.primary}08);
  border: 1px solid ${({ theme }) => theme.colors.primary}33;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CTATitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`;

export const CTADesc = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export const CTALink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  cursor: pointer;
  margin-top: 4px;

  &:hover { opacity: 0.7; }
`;

// ─── Empty / Error ──────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 24px;
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