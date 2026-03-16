import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import axios from 'axios';
import { taskService } from '../../../services/task.service';
import {
  Overlay,
  StyledCreateTaskModal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
} from './CreateTaskModal.styles';

const createTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  points: z.string().min(1, 'Pontos são obrigatórios'),
  is_daily_routine: z.boolean(),
});

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

interface CreateTaskModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, onSuccess }) => {
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { is_daily_routine: false },
  });

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      await taskService.createTask({
        title: data.title,
        description: data.description,
        points: Number(data.points),
        is_daily_routine: data.is_daily_routine,
      });
      onSuccess();
      onClose();
      toast.success('Tarefa criada com sucesso! 🎯');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error || 'Erro ao criar tarefa';
        setError(msg);
        toast.error(msg);
      } else {
        setError('Erro inesperado');
        toast.error('Erro inesperado');
      }
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <StyledCreateTaskModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Criar Tarefa</ModalTitle>
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
            {isSubmitting ? 'Criando...' : 'Criar Tarefa'}
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </StyledCreateTaskModal>
    </Overlay>,
    document.body
  );
};

export default CreateTaskModal;