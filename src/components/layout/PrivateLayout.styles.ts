import styled from 'styled-components';

export const Wrapper = styled.div<{ $sidebarCollapsed: boolean }>`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

export const Content = styled.main<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  height: 100vh;

  /* mobile: desconta a altura do BottomNav (64px) */
  @media (max-width: 767px) {
    height: calc(100vh - 64px);
    padding-bottom: 24px;
  }

  @media (min-width: 768px) {
    margin-left: ${({ $sidebarCollapsed }) => ($sidebarCollapsed ? '72px' : '220px')};
    transition: margin-left 0.2s ease;
  }
`;