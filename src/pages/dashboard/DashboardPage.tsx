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
  ChallengeCard, ChallengeLabel, ChallengeName, ProgressSection, ProgressHeader,
  ProgressTitle, DaysRemaining,
  ChallengeFooter, DetailsButton,
  SectionHeader, SectionTitle, SeeAllLink,
  TasksGrid, TaskCard, TaskCardHeader, TaskIcon, PointsBadge, TaskCardName,
  TaskCardDesc, CompleteButton,
  EmptyCard, EmptyIconCircle, EmptyTitle, EmptySubtitle, InviteButton,
  BottomGrid, InfoCard, InfoCardIcon, InfoCardTitle,
  HowItWorksList, HowItWorksItem,
  ErrorMessage,
} from './DashboardPage.styles';
import { Target, Zap, CheckCircle, Flame } from 'lucide-react';

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
      // Re-fetch to update points, streak, and task completion count
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
            <ScoreAvatar>{profile.name.charAt(0)}</ScoreAvatar>
            <ScoreInfo>
              <ScoreName>Seus pontos</ScoreName>
              <ScoreValue>{profile.points}<span>PTS</span></ScoreValue>
            </ScoreInfo>
          </ScoreCard>
          <ScoreCard $isWinning={false}>
            <ScoreAvatar style={{ background: '#FF8C00' }}><Flame size={20} color="white" /></ScoreAvatar>
            <ScoreInfo>
              <ScoreName>Sequência</ScoreName>
              <ScoreValue>{profile.current_streak}<span>Dias</span></ScoreValue>
              <ScoreTasks>Max: {profile.max_streak}</ScoreTasks>
            </ScoreInfo>
          </ScoreCard>
        </ScoreRow>
      )}

      {/* Active Challenge */}
      {challenge ? (
        <ChallengeCard>
          <ChallengeLabel>Desafio Atual</ChallengeLabel>
          <ChallengeName>{challenge.template?.title || `Desafio Ativo #${challenge.template_id}`}</ChallengeName>
          <ProgressSection>
            <ProgressHeader>
              <ProgressTitle>Status do Desafio</ProgressTitle>
              <DaysRemaining>Iniciado em {new Date(challenge.start_date).toLocaleDateString()}</DaysRemaining>
            </ProgressHeader>
          </ProgressSection>
          <ChallengeFooter>
            <DetailsButton onClick={() => navigate('/challenges')}>
              Ver Detalhes →
            </DetailsButton>
          </ChallengeFooter>
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

      {/* Daily Tasks */}
      {tasks.length > 0 ? (
        <>
          <SectionHeader>
            <SectionTitle><Zap size={16} color="#00FFFF" /> Suas Tarefas </SectionTitle>
            <SeeAllLink onClick={() => navigate('/tasks')}>VER TODAS</SeeAllLink>
          </SectionHeader>
          <TasksGrid>
            {tasks.map(({ task, completion_count }) => {
              const isCompleted = completion_count > 0 && task.is_daily_routine;
              return (
                <TaskCard key={task.id}>
                  <TaskCardHeader>
                    <TaskIcon><CheckCircle size={16} /></TaskIcon>
                    <PointsBadge>+{task.points}PTS</PointsBadge>
                  </TaskCardHeader>
                  <TaskCardName>{task.title}</TaskCardName>
                  <TaskCardDesc>{task.description || 'Sem descrição'}</TaskCardDesc>
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
        </>
      ) : (
        profile && (
           <BottomGrid>
            <InfoCard>
              <InfoCardIcon><Zap size={16} /></InfoCardIcon>
              <InfoCardTitle>Pronto para começar?</InfoCardTitle>
              <HowItWorksList>
                <HowItWorksItem>Vá para a aba Tarefas e crie novos hábitos diários.</HowItWorksItem>
                <HowItWorksItem>Complete tarefas e acumule pontos.</HowItWorksItem>
                <HowItWorksItem>Mantenha sua corrente diária para subir de nível!</HowItWorksItem>
              </HowItWorksList>
            </InfoCard>
          </BottomGrid>
        )
      )}
    </Container>
  );
};

export default DashboardPage;