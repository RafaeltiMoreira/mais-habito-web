import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0E1114; /* Darker background from image */
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
`;

// ─── Header ─────────────────────────────────────────────────────────────────

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
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
`;

export const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
  margin: 0;
  
  b {
    color: #FFF;
    font-weight: 500;
  }
`;

export const HeaderNav = styled.nav<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 480px) {
    position: absolute;
    top: 73px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: #0E1114;
    padding: 24px;
    gap: 20px;
    border-bottom: 1px solid #2D374840;
    box-shadow: 0 16px 32px rgba(0,0,0,0.5);
    
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
  color: #FFF;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const LoginButton = styled.button`
  background: transparent;
  color: #A0AEC0;
  border: none;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #FFF;
  }
`;

export const SignupButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #000;
  border: none;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 6px;
  transition: opacity 0.2s, transform 0.1s;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

// ─── Hero Section ───────────────────────────────────────────────────────────

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 24px 60px;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

export const HeroLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 24px;
`;

export const HeroTitle = styled.h2`
  font-size: 4.5rem;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.1;
  letter-spacing: -1.5px;
  max-width: 800px;
  margin: 0 auto 24px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.25rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  color: #A0AEC0;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// ─── Features Layout ─────────────────────────────────────────────────────────

export const FeaturesContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
  animation: ${fadeIn} 0.8s ease-out 0.2s forwards;
  opacity: 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div<{ $spanRow?: boolean }>`
  background: #15181C;
  border: 1px solid #2D374840;
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  grid-row: ${({ $spanRow }) => $spanRow ? '1 / span 2' : 'auto'};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}60;
  }

  @media (max-width: 480px) {
    padding: 24px;
  }

  @media (max-width: 360px) {
    padding: 20px;
  }
`;

export const CardIconBox = styled.div`
  width: 40px;
  height: 40px;
  background: #1A202C;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CardLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const CardLabelIcon = styled.div`
  background: #2D1A1A; /* Example tint for the fire background */
  padding: 6px;
  border-radius: 8px;
  display: flex;
  svg { color: #E53E3E; }
`;

export const CardLabelText = styled.span`
  color: #A0AEC0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #FFFFFF;
`;

export const CardDesc = styled.p`
  font-size: 1rem;
  color: #A0AEC0;
  line-height: 1.6;
  margin: 0;
`;

// ─── Visual Elements inside Cards ──────────────────────────────────────────

export const StreakVisual = styled.div`
  margin-top: auto;
  padding-top: 48px;
`;

export const StreakBox = styled.div`
  background: #0E1114;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 360px) {
    padding: 16px;
  }
`;

export const StreakInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StreakDays = styled.div`
  h4 {
    font-size: 2rem;
    font-weight: 800;
    color: #DD6B20; /* Orange color from image */
    margin: 0;
    line-height: 1;

    @media (max-width: 360px) {
      font-size: 1.5rem;
    }
  }
  span {
    font-size: 0.625rem;
    text-transform: uppercase;
    color: #A0AEC0;
    letter-spacing: 1px;
    display: block;
    margin-top: 4px;

    @media (max-width: 360px) {
      font-size: 0.5625rem;
    }
  }
`;

export const StreakChecks = styled.div`
  display: flex;
  gap: 4px;

  .check {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #38B2AC;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #38B2AC;

    @media (max-width: 360px) {
      width: 20px;
      height: 20px;
      svg { width: 12px; height: 12px; }
    }
  }
  .dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #4A5568;
    background: #1A202C;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #A0AEC0;
    font-size: 0.75rem;

    @media (max-width: 360px) {
      width: 20px;
      height: 20px;
      font-size: 0.625rem;
    }
  }
`;

export const StreakBar = styled.div`
  height: 6px;
  background: #2D3748;
  border-radius: 3px;
  width: 100%;
  overflow: hidden;

  div {
    width: 70%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

export const TasksVisual = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

export const FakeTaskItem = styled.div`
  background: #0E1114;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;

  .bullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
  
  &:nth-child(2) .bullet {
    background: #A0AEC0;
  }

  span {
    color: #E2E8F0;
    font-size: 0.875rem;
  }
`;

export const FloatingGreenBtn = styled.div`
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  background: #48BB78;
  width: 40px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
`;

// ─── Bottom CTA ─────────────────────────────────────────────────────────────

export const BottomCTA = styled.section`
  margin: 64px auto 120px;
  text-align: center;
  background: #000;
  border-radius: 24px;
  padding: 64px 24px;
  max-width: 1000px;
  width: calc(100% - 48px);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.primary}, transparent);
  }
`;

export const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFF;
  margin: 0 0 16px 0;
`;

export const CTADesc = styled.p`
  font-size: 1rem;
  color: #A0AEC0;
  margin: 0 auto 32px;
  max-width: 500px;
  line-height: 1.6;
`;

// ─── Footer ─────────────────────────────────────────────────────────────────

export const Footer = styled.footer`
  padding: 32px 48px;
  border-top: 1px solid #2D374840;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    text-align: center;
  }
`;

export const FooterLogo = styled.div`
  h2 {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    b { color: #FFF; font-weight: 500; }
  }
`;

export const FooterText = styled.p`
  color: #718096;
  font-size: 0.8125rem;
  margin: 0;
`;

// ─── WhatsApp Float ─────────────────────────────────────────────────────────

export const WhatsAppFloat = styled.a`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #25D366;
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  z-index: 999;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.5);
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;
