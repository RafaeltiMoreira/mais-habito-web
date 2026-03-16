import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { taskService } from '../../../services/task.service';
import type { Task } from '../../../types/task.types';
import {
  Overlay,
  StyledEditTaskModal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
} from './EditTaskModal.styles';

const editTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  points: z.string().min(1, 'Pontos são obrigatórios'),
  is_daily_routine: z.boolean(),
});

type EditTaskFormData = z.infer<typeof editTaskSchema>;

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSuccess: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose, onSuccess }) => {
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description || '',
      points: String(task.points),
      is_daily_routine: !!task.is_daily_routine,
    },
  });

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description || '',
      points: String(task.points),
      is_daily_routine: !!task.is_daily_routine,
    });
  }, [task, reset]);

  const onSubmit = async (data: EditTaskFormData) => {
    try {
      await taskService.updateTask(task.id, {
        title: data.title,
        description: data.description,
        points: Number(data.points),
        is_daily_routine: data.is_daily_routine,
      });
      onSuccess();
      onClose();
      toast.success('Tarefa atualizada! ✏️');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error || 'Erro ao editar tarefa';
        setError(msg);
        toast.error(msg);
      } else {
        setError('Erro inesperado');
      }
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <StyledEditTaskModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Editar Tarefa</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Título
            <Input {...register('title')} placeholder="Título da tarefa" />
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          </Label>
          <Label>
            Descrição
            <Input {...register('description')} placeholder="Descrição (opcional)" />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </Label>
          <Label>
            Pontos
            <Input
              {...register('points')}
              placeholder="Pontos"
              inputMode="numeric"
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                  e.preventDefault();
                }
              }}
            />
            {errors.points && <ErrorMessage>{errors.points.message}</ErrorMessage>}
          </Label>
          <Label style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" {...register('is_daily_routine')} />
            Tarefa Diária (Pode ser repetida todo dia)
          </Label>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </StyledEditTaskModal>
    </Overlay>,
    document.body
  );
};

export default EditTaskModal;