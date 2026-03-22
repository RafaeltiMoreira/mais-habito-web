import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarWrapper = styled.aside<{ $collapsed: boolean }>`
  display: none;

  @media (min-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: ${({ $collapsed }) => ($collapsed ? '72px' : '220px')};
    background-color: ${({ theme }) => theme.colors.surface};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    flex-direction: column;
    padding: 24px 0 20px;
    transition: width 0.25s ease;
    z-index: 100;
    overflow: hidden;
  }
`;

export const SidebarHeader = styled.div`
  padding: 0 20px;
  margin-bottom: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
`;

export const SidebarLogo = styled.div<{ $collapsed: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: opacity 0.15s ease;
  pointer-events: none;
  letter-spacing: -0.3px;

  span:first-child {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2px;
  padding: 0 12px;
`;

export const SidebarItem = styled(NavLink)<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
  border-left: ${({ $collapsed }) => $collapsed ? 'none' : '2px solid transparent'};
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};

  svg {
    flex-shrink: 0;
    min-width: 20px;
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary}14;
    border-left-color: ${({ $collapsed }) => $collapsed ? 'transparent' : undefined};
  }

  &:not(.active):hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.primary}0A;
  }
`;

export const SidebarLabel = styled.span<{ $collapsed: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  width: ${({ $collapsed }) => ($collapsed ? 0 : 'auto')};
  overflow: hidden;
  transition: opacity 0.15s ease, width 0.25s ease;
  pointer-events: none;
  white-space: nowrap;
`;

export const CollapseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  position: absolute;
  right: 8px;
  top: 26px;
  transition: all 0.2s;
  z-index: 101;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary}4D;
    background-color: ${({ theme }) => theme.colors.primary}0F;
  }
`;

export const NewHabitButton = styled.button<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px 12px 16px;
  padding: 12px 16px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark || theme.colors.primary});
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.2s;

  svg {
    flex-shrink: 0;
    min-width: 18px;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 12px;
`;

export const ThemeToggle = styled.button<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8125rem;
  font-family: inherit;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};

  svg {
    flex-shrink: 0;
    min-width: 18px;
  }

  span {
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    transition: opacity 0.15s ease;
    pointer-events: none;
    width: ${({ $collapsed }) => ($collapsed ? 0 : 'auto')};
    overflow: hidden;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary}4D;
    background-color: ${({ theme }) => theme.colors.primary}0F;
  }
`;

export const LogoutButton = styled.button<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary}4D;
  width: 100%;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  font-family: inherit;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  flex-shrink: 0;

  svg {
    flex-shrink: 0;
    min-width: 20px;
  }

  span {
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    transition: opacity 0.15s ease;
    pointer-events: none;
    width: ${({ $collapsed }) => ($collapsed ? 0 : 'auto')};
    overflow: hidden;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}1A;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;