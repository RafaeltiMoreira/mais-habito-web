import React from 'react';
import { Check, Pencil, Trash2, CheckSquare } from 'lucide-react';
import {
  Item, ItemLeft, TaskIconBox, TaskInfo, TaskName, TaskMeta,
  PointsBadge, CompletionCount, CompletedBadge,
  TaskActions, IconButton, CompleteButton,
} from './TaskItem.styles';
import type { TaskWithCount } from '../../../types/task.types';

interface TaskItemProps {
  taskWithCount: TaskWithCount;
  onEdit: (task: TaskWithCount['task']) => void;
  onDelete: (task: TaskWithCount['task']) => void;
  onComplete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ taskWithCount, onEdit, onDelete, onComplete }) => {
  const { task, completion_count } = taskWithCount;
  const { id, title, points, is_daily_routine } = task;

  const isCompleted = completion_count > 0 && is_daily_routine;

  return (
    <Item $completed={isCompleted}>
      <ItemLeft>
        <TaskIconBox $completed={isCompleted}>
          <CheckSquare size={18} />
        </TaskIconBox>
        <TaskInfo>
          <TaskName $completed={isCompleted}>{title}</TaskName>
          <TaskMeta>
            <PointsBadge>+{points} pts</PointsBadge>
            {is_daily_routine && <CompletionCount>Diária</CompletionCount>}
            {isCompleted && <CompletedBadge>● Concluída</CompletedBadge>}
          </TaskMeta>
        </TaskInfo>
      </ItemLeft>

      <TaskActions>
        {!isCompleted && (
          <IconButton title='Editar Tarefa' onClick={() => onEdit(task)}>
            <Pencil size={14} />
          </IconButton>
        )}
        <IconButton title='Excluir Tarefa' onClick={() => onDelete(task)}>
          <Trash2 size={14} />
        </IconButton>
        <CompleteButton
          title='Concluir Tarefa'
          $disabled={isCompleted}
          $completed={isCompleted}
          onClick={() => !isCompleted && onComplete(id)}
        >
          <Check size={16} />
        </CompleteButton>
      </TaskActions>
    </Item>
  );
};

export default TaskItem;