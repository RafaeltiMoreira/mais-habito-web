/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { taskService } from '../../services/task.service';
import { challengeService } from '../../services/challenge.service';
import { useAppCache } from '../../store/appCache';
import type { Task } from '../../types/task.types';
import TaskItem from '../challenges/components/TaskItem';
import CreateTaskModal from '../challenges/components/CreateTaskModal';
import EditTaskModal from '../challenges/components/EditTaskModal';
import DeleteTaskModal from '../challenges/components/DeleteTaskModal';
import {
  Container, Header, HeaderLeft, Title, ChallengeInfo, ChallengeLabel, ChallengeName,
  HeaderRight, CreateButton,
  FilterRow, FilterTab,
  TaskList,
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

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const [active, tasksData] = await Promise.all([
        challengeService.getActiveChallenge().catch(() => null),
        taskService.listMyTasks().catch(() => []),
      ]);

      cache.setChallenges({ activeUserChallenge: active, userChallenges: cache.userChallenges });
      cache.setDashboard({ dashboardTasks: tasksData });
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

  const { activeUserChallenge: activeChallenge, dashboardTasks: tasks } = cache;

  const filteredTasks = tasks.filter(({ task, completion_count }) => {
    const isCompleted = completion_count > 0 && task.is_daily_routine;
    if (filter === 'pendentes') return !isCompleted;
    if (filter === 'concluidas') return isCompleted;
    return true;
  });

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Title>Suas Tarefas</Title>
          {activeChallenge && (
            <ChallengeInfo>
              <ChallengeLabel>Desafio Ativo</ChallengeLabel>
              <ChallengeName>Desafio #{activeChallenge.template_id}</ChallengeName>
            </ChallengeInfo>
          )}
        </HeaderLeft>
        <HeaderRight>
          <CreateButton onClick={() => setShowCreateTaskModal(true)}>
            <Plus size={15} /> Nova Tarefa
          </CreateButton>
        </HeaderRight>
      </Header>

      <FilterRow>
        <FilterTab $active={filter === 'todas'} onClick={() => setFilter('todas')}>Todas</FilterTab>
        <FilterTab $active={filter === 'pendentes'} onClick={() => setFilter('pendentes')}>Pendentes</FilterTab>
        <FilterTab $active={filter === 'concluidas'} onClick={() => setFilter('concluidas')}>Concluídas</FilterTab>
      </FilterRow>

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