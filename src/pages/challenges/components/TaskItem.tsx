import React from 'react';
import { Check, Pencil, Trash2, CheckSquare } from 'lucide-react';
import {
  Item, ItemLeft, TaskIconBox, TaskInfo, TaskName, TaskDescription, TaskMeta,
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
  const { id, title, description, points, is_daily_routine } = task;

  const isCompleted = completion_count > 0;

  return (
    <Item $completed={isCompleted}>
      <ItemLeft>
        <TaskIconBox $completed={isCompleted}>
          <CheckSquare size={18} />
        </TaskIconBox>
        <TaskInfo>
          <TaskName $completed={isCompleted}>{title}</TaskName>
          {description && <TaskDescription $completed={isCompleted}>{description}</TaskDescription>}
          <TaskMeta>
            <PointsBadge>+{points} pts</PointsBadge>
            {is_daily_routine && <CompletionCount>Diária</CompletionCount>}
            {isCompleted && <CompletedBadge>● Concluída</CompletedBadge>}
          </TaskMeta>
        </TaskInfo>
      </ItemLeft>

      <TaskActions>
        {!isCompleted && (
          <>
            <IconButton title='Editar Tarefa' onClick={() => onEdit(task)}>
              <Pencil size={14} />
            </IconButton>
            <IconButton title='Excluir Tarefa' onClick={() => onDelete(task)}>
              <Trash2 size={14} />
            </IconButton>
            <CompleteButton
              title='Concluir Tarefa'
              $disabled={false}
              $completed={false}
              onClick={() => onComplete(id)}
            >
              <Check size={16} />
            </CompleteButton>
          </>
        )}
        {isCompleted && (
          <IconButton title='Excluir Tarefa' onClick={() => onDelete(task)}>
            <Trash2 size={14} />
          </IconButton>
        )}
      </TaskActions>
    </Item>
  );
};

export default TaskItem;