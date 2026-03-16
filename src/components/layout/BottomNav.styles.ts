import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  padding: 0 8px;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  flex: 1;
  height: 100%;
  transition: color 0.2s;
  position: relative;

  &.active {
    color: ${({ theme }) => theme.colors.primary};

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 0 0 4px 4px;
    }
  }

  &:not(.active):hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const NavLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 500;
`;

export const ThemeNavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: none;
  border: none;
  cursor: pointer;
  flex: 1;
  height: 100%;
  transition: color 0.2s;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;