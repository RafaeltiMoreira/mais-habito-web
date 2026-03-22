import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CheckSquare, Star, Flame, Boxes, Menu, X } from 'lucide-react';
import * as S from './HomePage.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Substituir depois para um novo contato "556100000000"
  const whatsappNumber = "5561000000000"; 
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre a MaisHábito.");

  const handleNav = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <S.Container>
      {/* HEADER */}
      <S.Header>
        <S.Logo>
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
        <S.HeroLabel>Dashboard de alta performance</S.HeroLabel>
        <S.HeroTitle>Tudo que você precisa para evoluir</S.HeroTitle>
        <S.HeroSubtitle>
          Transforme sua rotina através de uma interface técnica projetada para consistência e clareza mental.
        </S.HeroSubtitle>
      </S.HeroSection>

      {/* FEATURES GRID SECTION */}
      <S.FeaturesContainer>
        {/* Card 1: Gamification (spans 2 rows) */}
        <S.FeatureCard $spanRow>
          <S.CardLabel>
            <S.CardLabelIcon>
              <Flame size={16} />
            </S.CardLabelIcon>
            <S.CardLabelText>Gamificação Ativa</S.CardLabelText>
          </S.CardLabel>
          
          <S.CardTitle>Corrente de Hábitos</S.CardTitle>
          <S.CardDesc>
            Mantenha o momentum com visualização em tempo real do seu progresso. O sistema de correntes utiliza o efeito visual "Não quebre a corrente" para fortalecer sua disciplina.
          </S.CardDesc>

          <S.StreakVisual>
            <S.StreakBox>
              <S.StreakInfoRow>
                <S.StreakDays>
                  <h4>14 DIAS</h4>
                  <span>Sua Maior Sequência</span>
                </S.StreakDays>
                <S.StreakChecks>
                  <div className="check"><Check size={14} /></div>
                  <div className="check"><Check size={14} /></div>
                  <div className="dot">...</div>
                </S.StreakChecks>
              </S.StreakInfoRow>
              <S.StreakBar>
                <div />
              </S.StreakBar>
            </S.StreakBox>
          </S.StreakVisual>
        </S.FeatureCard>

        {/* Card 2: Custom Challenges */}
        <S.FeatureCard>
          <S.CardIconBox>
            <Star size={20} />
          </S.CardIconBox>
          <S.CardTitle>Desafios Personalizados</S.CardTitle>
          <S.CardDesc>
            Algoritmos que sugerem novos hábitos baseados no seu perfil e objetivos de longo prazo.
          </S.CardDesc>
        </S.FeatureCard>

        {/* Card 3: Task Manager */}
        <S.FeatureCard>
          <S.CardIconBox>
            <Boxes size={20} />
          </S.CardIconBox>
          <S.CardTitle>Gerenciador de Tarefas</S.CardTitle>
          <S.CardDesc>
            Organize sua rotina diária com um sistema de hierarquia técnica. Priorize o que importa.
          </S.CardDesc>
          <S.TasksVisual>
            <S.FakeTaskItem>
              <div className="bullet" />
              <span>Treinar por 30 minutos</span>
            </S.FakeTaskItem>
            <S.FakeTaskItem>
              <div className="bullet" />
              <span>Leitura Técnica</span>
            </S.FakeTaskItem>
            <S.FloatingGreenBtn>
              <CheckSquare size={18} />
            </S.FloatingGreenBtn>
          </S.TasksVisual>
        </S.FeatureCard>
      </S.FeaturesContainer>

      {/* CTA SECTION */}
      <S.BottomCTA>
        <S.CTATitle>Pronto para o próximo nível?</S.CTATitle>
        <S.CTADesc>
          Junte-se a milhares de usuários que estão otimizando suas tarefas e hábitos diariamente.
        </S.CTADesc>
        <S.SignupButton onClick={() => navigate('/signup')} style={{ padding: '16px 32px' }}>
          Começar Agora
        </S.SignupButton>
      </S.BottomCTA>

      {/* FOOTER */}
      <S.Footer>
        <S.FooterLogo>
          <h2>Mais<b>Hábito</b></h2>
        </S.FooterLogo>
        <S.FooterText>
          &copy; {new Date().getFullYear()} Mais Hábito. Todos os direitos reservados.
        </S.FooterText>
      </S.Footer>

      {/* WHATSAPP FLOATING BUTTON */}
      <S.WhatsAppFloat 
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 0C5.385 0 0 5.382 0 12.028c0 2.126.551 4.195 1.595 6.01L.026 24l6.113-1.603c1.745.962 3.715 1.472 5.892 1.472 6.646 0 12.03-5.382 12.03-12.028S18.677 0 12.031 0zm0 21.821c-1.801 0-3.565-.483-5.115-1.401l-.367-.217-3.8.995 1.01-3.702-.239-.379c-1.009-1.605-1.543-3.454-1.543-5.361 0-5.516 4.49-10.007 10.006-10.007 5.515 0 10.007 4.49 10.007 10.007 0 5.515-4.492 10.007-10.007 10.007zM17.53 14.5c-.302-.152-1.789-.884-2.065-.986-.275-.101-.476-.152-.676.152-.2.304-.775.986-.949 1.189-.175.202-.349.227-.652.076-1.584-.793-2.73-1.498-3.766-3.238-.21-.355.032-.472.316-.763.155-.16.302-.355.454-.532.102-.127.153-.228.254-.38.102-.202.051-.379-.025-.531-.076-.152-.676-1.631-.926-2.233-.243-.585-.49-.505-.676-.514-.176-.008-.377-.008-.577-.008-.201 0-.527.076-.803.38-.276.303-1.054 1.03-1.054 2.511 0 1.482 1.079 2.915 1.229 3.118.15.203 2.126 3.245 5.148 4.546 1.944.836 2.662.909 3.654.764.717-.105 2.164-.884 2.466-1.741.301-.857.301-1.593.21-1.741-.09-.153-.339-.253-.64-.405z"/>
        </svg>
      </S.WhatsAppFloat>
    </S.Container>
  );
};

export default HomePage;
