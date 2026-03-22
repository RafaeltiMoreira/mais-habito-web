/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { challengeService } from '../../services/challenge.service';
import { taskService } from '../../services/task.service';
import { userService } from '../../services/user.service';
import { useAuthStore } from '../../store/authStore';
import { useAppCache } from '../../store/appCache';
import type { TaskWithCount } from '../../types/task.types';
import {
  Container, Header, Greeting, Subtitle,
  ScoreRow, ScoreCard, ScoreAvatar, ScoreInfo, ScoreName, ScoreValue, ScoreTasks,
  TwoColumnLayout, MainColumn, AsideColumn,
  SectionLabel,
  ChallengeCard, ChallengeCardInner, ChallengeLeft, ChallengeName,
  ChallengeMetaRow, ChallengeDate, ChallengeBadge, DetailsLink,
  TasksGrid, TaskCard, TaskIcon, TaskCardInfo, TaskCardNameRow,
  PointsBadge, TaskCardName, TaskCardDesc, CompleteButton,
  EmptyCard, EmptyIconCircle, EmptyTitle, EmptySubtitle, InviteButton,
  InfoCard, InfoCardHeader, InfoCardIcon, InfoCardTitle, InfoCardDesc, InfoCardLink,
  HowItWorksList, HowItWorksItem,
  QuoteCard, QuoteText,
  ErrorMessage,
} from './DashboardPage.styles';
import { Target, Zap, CheckCircle, Flame, Calendar, ArrowRight, Info, Rocket, Code, Dumbbell } from 'lucide-react';

// Simple mapping of task-category icons
const getTaskIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('treino') || t.includes('hiit') || t.includes('exerc')) return <Dumbbell size={20} />;
  if (t.includes('cod') || t.includes('test') || t.includes('dev') || t.includes('program')) return <Code size={20} />;
  return <CheckCircle size={20} />;
};

const DashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const cache = useAppCache();

  const hasCache = cache.profile !== null || cache.activeUserChallenge !== null || cache.dashboardTasks.length > 0;
  const [loading, setLoading] = useState(!hasCache);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const [profileData, challengeData, tasksData] = await Promise.all([
        userService.getProfile(),
        challengeService.getActiveChallenge().catch(() => null),
        taskService.listMyTasks().catch(() => [] as TaskWithCount[])
      ]);

      cache.setProfile(profileData);
      cache.setChallenges({ activeUserChallenge: challengeData });
      cache.setDashboard({ dashboardTasks: tasksData.slice(0, 3) });
      
    } catch {
      if (!silent) setError('Erro ao carregar dados do dashboard');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(hasCache);
  }, []);

  const handleCompleteTask = async (taskId: number) => {
    try {
      await taskService.completeTask(taskId);
      fetchData(true);
    } catch {
      // silent fail
    }
  };

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  const profile = cache.profile;
  const challenge = cache.activeUserChallenge;
  const tasks = cache.dashboardTasks;

  const userName = user?.name?.split(' ')[0] || 'Usuário';

  return (
    <Container>
      <Header>
        <Greeting>Olá, {userName}! 👋</Greeting>
        <Subtitle>Pronto para superar seus limites hoje?</Subtitle>
      </Header>

      {/* Gamification Stats */}
      {profile && (
        <ScoreRow>
          <ScoreCard $isWinning={true}>
            <ScoreInfo>
              <ScoreName>Seus pontos</ScoreName>
              <ScoreValue>{profile.points}<span>PTS</span></ScoreValue>
            </ScoreInfo>
            <ScoreAvatar>{profile.name.charAt(0)}</ScoreAvatar>
          </ScoreCard>
          <ScoreCard $isWinning={false}>
            <ScoreInfo>
              <ScoreName>Sequência</ScoreName>
              <ScoreValue>{profile.current_streak}<span>Dias</span></ScoreValue>
              <ScoreTasks>Pontuação: {profile.max_streak}</ScoreTasks>
            </ScoreInfo>
            <ScoreAvatar style={{ background: '#FF8C00' }}><Flame size={20} color="white" /></ScoreAvatar>
          </ScoreCard>
        </ScoreRow>
      )}

      {/* Two Column Layout */}
      <TwoColumnLayout>
        {/* Main Content (Left) */}
        <MainColumn>
          {/* Active Challenge */}
          <SectionLabel>DESAFIO ATUAL</SectionLabel>
          {challenge ? (
            <ChallengeCard>
              <ChallengeCardInner>
                <ChallengeLeft>
                  <ChallengeName>"{challenge.template?.title || `Desafio #${challenge.template_id}`}"</ChallengeName>
                  <ChallengeMetaRow>
                    <ChallengeDate>
                      <Calendar size={14} /> Início: {new Date(challenge.start_date).toLocaleDateString('pt-BR')}
                    </ChallengeDate>
                    <ChallengeBadge>ATIVO</ChallengeBadge>
                  </ChallengeMetaRow>
                </ChallengeLeft>
                <DetailsLink onClick={() => navigate('/challenges')}>
                  Ver Detalhes <ArrowRight size={16} />
                </DetailsLink>
              </ChallengeCardInner>
            </ChallengeCard>
          ) : (
            <EmptyCard>
              <EmptyIconCircle $active>
                <Target size={20} />
              </EmptyIconCircle>
              <EmptyTitle>Nenhum desafio ativo.</EmptyTitle>
              <EmptySubtitle>Aceite um novo desafio para começar!</EmptySubtitle>
              <InviteButton onClick={() => navigate('/challenges')}>
                <Target size={15} /> Explorar Desafios
              </InviteButton>
            </EmptyCard>
          )}

          {/* Tasks */}
          <SectionLabel>SUAS TAREFAS</SectionLabel>
          {tasks.length > 0 ? (
            <TasksGrid>
              {tasks.map(({ task, completion_count }) => {
                const isCompleted = completion_count > 0;
                return (
                  <TaskCard key={task.id}>
                    <TaskIcon>
                      {getTaskIcon(task.title)}
                    </TaskIcon>
                    <TaskCardInfo>
                      <TaskCardNameRow>
                        <TaskCardName>{task.title}</TaskCardName>
                        <PointsBadge>+{task.points}PTS</PointsBadge>
                      </TaskCardNameRow>
                      <TaskCardDesc>{task.description || 'Sem descrição'}</TaskCardDesc>
                    </TaskCardInfo>
                    <CompleteButton
                      $disabled={isCompleted}
                      disabled={isCompleted}
                      onClick={() => !isCompleted && handleCompleteTask(task.id)}
                    >
                      {isCompleted ? 'Concluída ✓' : 'Concluir'}
                    </CompleteButton>
                  </TaskCard>
                );
              })}
            </TasksGrid>
          ) : (
            <EmptyCard>
              <EmptyIconCircle $active>
                <CheckCircle size={20} />
              </EmptyIconCircle>
              <EmptyTitle>Nenhuma tarefa ativa.</EmptyTitle>
              <EmptySubtitle>Crie sua primeira tarefa para começar a acumular pontos!</EmptySubtitle>
              <InviteButton onClick={() => navigate('/tasks')}>
                <Zap size={15} /> Criar Tarefa
              </InviteButton>
            </EmptyCard>
          )}
        </MainColumn>

        {/* Right Sidebar */}
        <AsideColumn>
          {/* Pronto para começar? */}
          <InfoCard>
            <InfoCardHeader>
              <InfoCardIcon><Rocket size={18} /></InfoCardIcon>
              <InfoCardTitle>Pronto para começar?</InfoCardTitle>
            </InfoCardHeader>
            <HowItWorksList>
              <HowItWorksItem>Defina sua meta diária no perfil</HowItWorksItem>
              <HowItWorksItem>Convide um amigo para o desafio</HowItWorksItem>
              <HowItWorksItem>Mantenha sua sequência ativa</HowItWorksItem>
            </HowItWorksList>
          </InfoCard>

          {/* O que é o MaisHábito? */}
          <InfoCard>
            <InfoCardHeader>
              <InfoCardIcon><Info size={18} /></InfoCardIcon>
              <InfoCardTitle>O que é o MaisHábito?</InfoCardTitle>
            </InfoCardHeader>
            <InfoCardDesc>
              Uma plataforma que transforma sua rotina em uma jornada épica. 
              Ganhe pontos, suba no ranking e conquiste novos limites através da gamificação de hábitos reais.
            </InfoCardDesc>
            <InfoCardLink onClick={() => navigate('/perfil')}>
              SAIBA MAIS SOBRE A NOSSA VISÃO
            </InfoCardLink>
          </InfoCard>

          {/* Motivational Quote */}
          <QuoteCard>
            <QuoteText>"O futuro pertence àqueles que constroem hoje."</QuoteText>
          </QuoteCard>
        </AsideColumn>
      </TwoColumnLayout>
    </Container>
  );
};

export default DashboardPage;