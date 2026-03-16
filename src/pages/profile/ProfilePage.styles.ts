import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  max-width: 520px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.4s ease both;
`;

// ─── Avatar ───────────────────────────────────────────────────────────────────

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
`;

export const Avatar = styled.div<{ $imageUrl?: string | null }>`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: ${({ $imageUrl, theme }) => $imageUrl ? `url(${$imageUrl}) center/cover` : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`};
  border: 3px solid ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}4D;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  font-weight: 700;
  color: #fff;
`;

export const UserName = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.3px;
`;

export const UserStats = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }
`;

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 13px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary}80;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}1A;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary}80;
  }
`;

export const PasswordSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 20px;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.2s, transform 0.1s;
  margin-top: 4px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// ─── Logout (mobile only) ─────────────────────────────────────────────────────

export const LogoutRow = styled.div`
  display: none;
  width: 100%;

  @media (max-width: 767px) {
    display: flex;
  }
`;

export const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.surfaceAlt}40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}4D;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LogoutLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// ─── Messages ─────────────────────────────────────────────────────────────────

export const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.8125rem;
  text-align: center;
  padding: 10px;
  background: ${({ theme }) => theme.colors.success}14;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.success}26;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8125rem;
  text-align: center;
`;