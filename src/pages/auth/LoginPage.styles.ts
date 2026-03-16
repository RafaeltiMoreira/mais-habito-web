import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 24px ${({ theme }) => theme.colors.primary}4D; }
  50% { box-shadow: 0 0 40px ${({ theme }) => theme.colors.primary}80; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  background-image:
    radial-gradient(ellipse 80% 60% at 50% -10%, ${({ theme }) => theme.colors.primary}26 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 50% 100%, ${({ theme }) => theme.colors.primary}0F 0%, transparent 70%);
  padding: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 20% 80%, ${({ theme }) => theme.colors.primary}0A 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, ${({ theme }) => theme.colors.primary}0A 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  animation: ${fadeIn} 0.6s ease forwards;
`;

export const LogoIcon = styled.div`
  width: 56px;
  padding: 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  animation: ${glowPulse} 3s ease-in-out infinite;
`;

export const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.textPrimary};

  span b {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Tagline = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.2px;
  margin-top: -8px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 32px;
  gap: 20px;
  backdrop-filter: blur(12px);
  animation: ${fadeIn} 0.6s ease 0.1s both;
`;

export const CardTitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.3px;
`;

export const CardSubtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  pointer-events: none;
  font-size: 0.875rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 13px 14px 13px 40px;
  background: ${({ theme }) => theme.colors.surfaceAlt}60;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, background 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary}80;
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary}80;
  }
`;

export const ForgotPassword = styled.a`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: right;
  cursor: pointer;
  transition: opacity 0.2s;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.75rem;
  text-align: center;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.error}14;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.error}26;
`;

export const SignupLink = styled.p`
  text-align: center;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  animation: ${fadeIn} 0.6s ease 0.2s both;
  margin-top: revert;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;