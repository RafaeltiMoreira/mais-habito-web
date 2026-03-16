import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import * as S from './HomePage.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <S.Container>
      {/* HEADER */}
      <S.Header>
        <S.Logo>
          <S.LogoIcon>⚡</S.LogoIcon>
          <S.LogoText>Mais<b>Hábito</b></S.LogoText>
        </S.Logo>
        
        <S.MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </S.MobileMenuButton>

        <S.HeaderNav $isOpen={isMenuOpen}>
          <S.LoginButton onClick={() => handleNav('/login')}>Entrar</S.LoginButton>
          <S.SignupButton onClick={() => handleNav('/signup')}>Criar Conta</S.SignupButton>
        </S.HeaderNav>
      </S.Header>

      {/* HERO SECTION */}
      <S.HeroSection>
        <S.HeroContent>
          <S.HeroTitle>
            Transforme sua rotina em uma <span>jornada de conquistas</span>
          </S.HeroTitle>
          <S.HeroSubtitle>
            A Mais Hábito é a plataforma definitiva para transformar seus hábitos usando gamificação. 
            Crie desafios, complete tarefas diárias e ganhe pontos para construir a melhor versão de si mesmo.
          </S.HeroSubtitle>
          <S.CTAButtonGroup>
            <S.PrimaryCTA onClick={() => navigate('/signup')}>
              Começar Agora
            </S.PrimaryCTA>
            <S.SecondaryCTA onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
              Saiba Mais
            </S.SecondaryCTA>
          </S.CTAButtonGroup>
        </S.HeroContent>
        <S.HeroImageWrapper>
          <S.HeroGraphic>
            <S.FloatCard $delay="0s">
              <S.FloatIcon>🎯</S.FloatIcon>
              <div>
                <p>Desafio Ativo</p>
                <strong>21 Dias de Foco</strong>
              </div>
            </S.FloatCard>
            <S.FloatCard $delay="1s" style={{ top: '42%', right: '5%' }}>
              <S.FloatIcon>🔥</S.FloatIcon>
              <div>
                <p>Chama ativa (Sequência)</p>
                <strong>12 Dias Seguidos</strong>
              </div>
            </S.FloatCard>
            <S.FloatCard $delay="2s" style={{ top: '72%', left: '5%' }}>
              <S.FloatIcon>⭐</S.FloatIcon>
              <div>
                <p>Nova Conquista</p>
                <strong>+50 Pontos</strong>
              </div>
            </S.FloatCard>
          </S.HeroGraphic>
        </S.HeroImageWrapper>
      </S.HeroSection>

      {/* FEATURES SECTION */}
      <S.FeaturesSection id="features">
        <S.SectionHeader>
          <S.SectionBadge>Recursos</S.SectionBadge>
          <S.SectionTitle>Tudo que você precisa para evoluir</S.SectionTitle>
        </S.SectionHeader>
        
        <S.FeaturesGrid>
          <S.FeatureCard>
            <S.FeatureIcon>🏆</S.FeatureIcon>
            <S.FeatureTitle>Desafios Personalizados</S.FeatureTitle>
            <S.FeatureDesc>Crie ou escolha modelos de desafios de 7, 21 ou 30 dias para moldar novos hábitos de forma estruturada.</S.FeatureDesc>
          </S.FeatureCard>
          
          <S.FeatureCard>
            <S.FeatureIcon>✅</S.FeatureIcon>
            <S.FeatureTitle>Gerenciador de Tarefas</S.FeatureTitle>
            <S.FeatureDesc>Organize o seu dia a dia com tarefas atreladas aos seus desafios. Ganhe pontos ao concluir cada missão.</S.FeatureDesc>
          </S.FeatureCard>
          
          <S.FeatureCard>
            <S.FeatureIcon>🔥</S.FeatureIcon>
            <S.FeatureTitle>Corrente de Hábitos</S.FeatureTitle>
            <S.FeatureDesc>Mantenha seu ritmo completando tarefas todos os dias. Não quebre a corrente!</S.FeatureDesc>
          </S.FeatureCard>
        </S.FeaturesGrid>
      </S.FeaturesSection>

      {/* FOOTER */}
      <S.Footer>
        <S.FooterContent>
          <S.FooterLogo>
            <S.LogoIcon>⚡</S.LogoIcon>
            <S.LogoText>Mais<b>Hábito</b></S.LogoText>
          </S.FooterLogo>
          <S.FooterText>
            &copy; {new Date().getFullYear()} Mais Hábito. Todos os direitos reservados.
          </S.FooterText>
        </S.FooterContent>
      </S.Footer>
    </S.Container>
  );
};

export default HomePage;
