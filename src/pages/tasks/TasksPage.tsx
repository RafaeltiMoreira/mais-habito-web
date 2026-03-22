/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { CheckSquare, Flame, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import { taskService } from '../../services/task.service';
import { challengeService } from '../../services/challenge.service';
import { userService } from '../../services/user.service';
import { useAppCache } from '../../store/appCache';
import type { Task } from '../../types/task.types';
import TaskItem from '../challenges/components/TaskItem';
import CreateTaskModal from '../challenges/components/CreateTaskModal';
import EditTaskModal from '../challenges/components/EditTaskModal';
import DeleteTaskModal from '../challenges/components/DeleteTaskModal';
import {
  Container, Header, HeaderLeft, Title,
  HeaderRight, CreateButton,
  StatsRow, FilterSection, FilterRow, FilterTab,
  StatDivider, StatItem, StatIcon, StatValue, StatLabel, StatNumber,
  TaskList,
  MotivationalCard, MotivationalIcon, MotivationalTitle, MotivationalDesc,
  MotivationalProgress, MotivationalBar, MotivationalBarFill, MotivationalStatus,
  EmptyState, EmptyIcon, EmptyTitle, EmptySubtitle,
  ErrorMessage,
} from './TasksPage.styles';

type FilterType = 'todas' | 'pendentes' | 'concluidas';

const TasksPage = () => {
  const cache = useAppCache();

  const hasCache = cache.dashboardTasks.length > 0;
  const [loading, setLoading] = useState(!hasCache);
  const [error, setError] = useState<string | null>(null);
  const [taskError, setTaskError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('todas');
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [streak, setStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const [active, tasksData, profile] = await Promise.all([
        challengeService.getActiveChallenge().catch(() => null),
        taskService.listMyTasks().catch(() => []),
        userService.getProfile().catch(() => null),
      ]);

      cache.setChallenges({ activeUserChallenge: active, userChallenges: cache.userChallenges });
      cache.setDashboard({ dashboardTasks: tasksData });

      if (profile) {
        setStreak(profile.current_streak);
        setTotalPoints(profile.points);
        cache.setProfile(profile);
      }
    } catch {
      if (!silent) setError('Erro ao carregar tarefas');
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
      setTaskError(null);
      toast.success('Tarefa concluída! +pontos ⚡');
      fetchData(true);
    } catch {
      setTaskError('Erro ao completar tarefa');
      toast.error('Erro ao completar tarefa');
    }
  };

  const { dashboardTasks: tasks } = cache;

  const filteredTasks = tasks.filter(({ completion_count }) => {
    const isCompleted = completion_count > 0;
    if (filter === 'pendentes') return !isCompleted;
    if (filter === 'concluidas') return isCompleted;
    return true;
  });

  const completedCount = tasks.filter(({ completion_count }) =>
    completion_count > 0
  ).length;
  const pendingCount = tasks.length - completedCount;
  const completionPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Title>Suas Tarefas</Title>
        </HeaderLeft>
        <HeaderRight>
          <CreateButton onClick={() => setShowCreateTaskModal(true)}>
            <CheckSquare size={16} /> NOVA TAREFA
          </CreateButton>
        </HeaderRight>
      </Header>

      {/* Filter tabs + stats */}
      <StatsRow>
        <FilterSection>
          <FilterRow>
            <FilterTab $active={filter === 'todas'} onClick={() => setFilter('todas')}>Todas</FilterTab>
            <FilterTab $active={filter === 'pendentes'} onClick={() => setFilter('pendentes')}>Pendentes</FilterTab>
            <FilterTab $active={filter === 'concluidas'} onClick={() => setFilter('concluidas')}>Concluídas</FilterTab>
          </FilterRow>
        </FilterSection>
        <StatDivider />
        <StatItem>
          <StatIcon><Flame size={18} /></StatIcon>
          <StatValue>
            <StatLabel>SEQUÊNCIA ATUAL</StatLabel>
            <StatNumber>{streak} DIAS</StatNumber>
          </StatValue>
        </StatItem>
        <StatDivider />
        <StatItem>
          <StatValue>
            <StatLabel>PONTUAÇÃO TOTAL</StatLabel>
            <StatNumber>{totalPoints.toLocaleString()}</StatNumber>
          </StatValue>
        </StatItem>
      </StatsRow>

      {/* Task list */}
      <TaskList>
        {taskError && <ErrorMessage>{taskError}</ErrorMessage>}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((taskWithCount) => (
            <TaskItem
              key={taskWithCount.task.id}
              taskWithCount={taskWithCount}
              onEdit={(task) => { setTaskError(null); setEditingTask(task); }}
              onDelete={(task) => { setTaskError(null); setDeletingTask(task); }}
              onComplete={handleCompleteTask}
            />
          ))
        ) : (
          <EmptyState>
            <EmptyIcon><CheckSquare size={20} /></EmptyIcon>
            <EmptyTitle>
              {filter === 'todas' ? 'Nenhuma tarefa criada' : `Nenhuma tarefa ${filter}`}
            </EmptyTitle>
            <EmptySubtitle>
              {filter === 'todas' ? 'Crie sua primeira tarefa para começar.' : 'Tente outro filtro.'}
            </EmptySubtitle>
          </EmptyState>
        )}
      </TaskList>

      {/* Motivational card */}
      <MotivationalCard>
        <MotivationalIcon><Lightbulb size={24} /></MotivationalIcon>
        <MotivationalTitle>Continue no Fluxo!</MotivationalTitle>
        <MotivationalDesc>
          {pendingCount > 0
            ? <>Completar mais {pendingCount} tarefa{pendingCount > 1 ? 's' : ''} hoje ativará o modo <em>Hyper-Focus</em>, dobrando seus pontos de streak.</>
            : <>Todas as tarefas concluídas! Modo <em>Hyper-Focus</em> ativado. 🔥</>
          }
        </MotivationalDesc>
        <MotivationalProgress>
          <MotivationalBar>
            <MotivationalBarFill $percent={completionPercent} />
          </MotivationalBar>
          <MotivationalStatus>STATUS: {completionPercent}% PARA O PRÓXIMO NÍVEL</MotivationalStatus>
        </MotivationalProgress>
      </MotivationalCard>

      {showCreateTaskModal && (
        <CreateTaskModal
          onClose={() => setShowCreateTaskModal(false)}
          onSuccess={() => { setTaskError(null); fetchData(true); }}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSuccess={() => { setTaskError(null); fetchData(true); }}
        />
      )}

      {deletingTask && (
        <DeleteTaskModal
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
          onSuccess={() => { setTaskError(null); fetchData(true); }}
        />
      )}
    </Container>
  );
};

export default TasksPage;