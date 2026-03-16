import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 30px ${({ theme }) => theme.colors.primary}33; }
  50% { box-shadow: 0 0 60px ${({ theme }) => theme.colors.primary}66; }
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  overflow-x: hidden;
`;

// ─── Header ─────────────────────────────────────────────────────────────────

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px;
  background: ${({ theme }) => theme.colors.surfaceAlt}80;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}4D;
`;

export const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;

  b {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HeaderNav = styled.nav<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    position: absolute;
    top: 73px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.surfaceAlt};
    padding: 24px;
    gap: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 16px 32px rgba(0,0,0,0.3);
    
    /* Reveal animation */
    clip-path: ${({ $isOpen }) => $isOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)'};
    transition: clip-path 0.3s ease-in-out;
    visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const LoginButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  border: none;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const SignupButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: white;
  border: none;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 24px;
  border-radius: 10px;
  transition: opacity 0.2s, transform 0.1s;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}4D;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px;
  }
`;

// ─── Hero Section ───────────────────────────────────────────────────────────

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 48px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 64px;
  flex: 1;

  @media (max-width: 992px) {
    flex-direction: column;
    padding: 64px 24px;
    text-align: center;
    gap: 48px;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeIn} 0.8s ease-out forwards;

  @media (max-width: 992px) {
    align-items: center;
  }
`;

export const HeroTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.1;
  letter-spacing: -1px;

  span {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 500px;

  @media (max-width: 992px) {
    max-width: 600px;
  }
`;

export const CTAButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const PrimaryCTA = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 16px 32px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}66;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px ${({ theme }) => theme.colors.primary}80;
  }
`;

export const SecondaryCTA = styled.button`
  background: ${({ theme }) => theme.colors.surfaceAlt}80;
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  font-weight: 600;
  padding: 16px 32px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    border-color: ${({ theme }) => theme.colors.primary}80;
  }
`;

export const HeroImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: ${fadeIn} 0.8s ease-out 0.2s forwards;
  opacity: 0;

  @media (max-width: 992px) {
    width: 100%;
    max-width: 400px;
    margin-top: 24px;
  }
`;

export const HeroGraphic = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background: radial-gradient(circle at center, ${({ theme }) => theme.colors.primary}1A 0%, transparent 70%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${glowPulse} 4s ease-in-out infinite;
  border-radius: 24px;
`;

export const FloatCard = styled.div<{ $delay: string }>`
  position: absolute;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay};

  p {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  strong {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:nth-child(1) { top: 8%; left: 5%; }

  @media (max-width: 768px) {
    padding: 10px 16px;
    gap: 12px;
    border-radius: 12px;

    p { font-size: 0.65rem; }
    strong { font-size: 0.875rem; }

    &:nth-child(1) { top: 5%; left: 0%; }
    &:nth-child(2) { top: 45%; right: 0%; }
    &:nth-child(3) { top: 78%; left: 0%; }
  }
`;

export const FloatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.primary}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.25rem;
  }
`;

// ─── Features Section ───────────────────────────────────────────────────────

export const FeaturesSection = styled.section`
  padding: 100px 48px;
  background: ${({ theme }) => theme.colors.surfaceAlt}30;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;

  @media (max-width: 768px) {
    padding: 64px 24px;
    gap: 48px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const SectionBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary}1A;
  color: ${({ theme }) => theme.colors.primary};
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.05);
    border-color: ${({ theme }) => theme.colors.primary}40;
  }
`;

export const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.primary}1A;
  /* color inside icon if it was svg, but we use emoji */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FeatureDesc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

// ─── Footer ─────────────────────────────────────────────────────────────────

export const Footer = styled.footer`
  padding: 40px 48px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  margin-top: auto;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  ${LogoIcon} {
    width: 32px;
    height: 32px;
    font-size: 1rem;
    box-shadow: none;
    animation: none;
  }

  ${LogoText} {
    font-size: 1rem;
  }
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
