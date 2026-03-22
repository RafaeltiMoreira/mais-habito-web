import { type FC, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Trash2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { challengeService } from '../../../services/challenge.service';
import type { ChallengeTemplate } from '../../../types/challenge.types';
import {
  Overlay,
  StyledCreateChallengeModal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  Label,
  Input,
  TextArea,
  Select,
  SubmitButton,
  SecondaryButton,
  DeleteButton,
  TemplateRow,
  ErrorMessage,
} from './CreateChallengeModal.styles';

const createChallengeSchema = z.object({
  templateId: z.string().min(1, 'Selecione um template'),
});

const newChallengeSchema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  description: z.string().min(10, 'Mínimo 10 caracteres'),
  duration_days: z.number().min(1, 'Mínimo 1 dia').max(365, 'Máximo 365 dias'),
});

type CreateChallengeForm = z.infer<typeof createChallengeSchema>;
type NewChallengeForm = z.infer<typeof newChallengeSchema>;

interface CreateChallengeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateChallengeModal: FC<CreateChallengeModalProps> = ({ onClose, onSuccess }) => {
  const [view, setView] = useState<'accept' | 'create' | 'delete'>('accept');
  const [apiError, setApiError] = useState<string | null>(null);
  const [templates, setTemplates] = useState<ChallengeTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const data = await challengeService.listTemplates();
      setTemplates(data);
    } catch {
      setApiError('Erro ao carregar templates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadTemplates = async () => {
      try {
        const data = await challengeService.listTemplates();
        if (isMounted) {
          setTemplates(data);
        }
      } catch {
        if (isMounted) {
          setApiError('Erro ao carregar templates');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadTemplates();

    return () => {
      isMounted = false;
    };
  }, []);

  const {
    register: registerAccept,
    handleSubmit: handleAcceptSubmit,
    formState: { errors: acceptErrors, isSubmitting: isAccepting },
  } = useForm<CreateChallengeForm>({
    resolver: zodResolver(createChallengeSchema),
  });

  const {
    register: registerNew,
    handleSubmit: handleNewSubmit,
    formState: { errors: newErrors, isSubmitting: isCreating },
    reset: resetNewForm,
  } = useForm<NewChallengeForm>({
    resolver: zodResolver(newChallengeSchema),
  });

  const onAccept = async (data: CreateChallengeForm) => {
    setApiError(null);
    try {
      await challengeService.acceptChallenge(Number(data.templateId));
      onSuccess();
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data?.error || 'Erro ao aceitar desafio. Tente novamente.');
      } else {
        setApiError('Erro ao aceitar desafio. Tente novamente.');
      }
    }
  };

  const onCreate = async (data: NewChallengeForm) => {
    setApiError(null);
    try {
      await challengeService.createTemplate(data);
      toast.success('Desafio criado com sucesso!');
      resetNewForm();
      fetchTemplates();
      setView('accept');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data?.error || 'Erro ao criar desafio.');
      } else {
        setApiError('Erro ao criar desafio.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir este desafio?")) return;
    try {
      await challengeService.deleteTemplate(id);
      toast.success('Desafio excluído com sucesso!');
      fetchTemplates();
      if (templates.length - 1 < 10 && view === 'delete') {
        setView('accept');
      }
    } catch {
      toast.error('Erro ao excluir desafio');
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <StyledCreateChallengeModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          {view === 'accept' && <ModalTitle>Aceitar novo Desafio</ModalTitle>}
          {view === 'create' && <ModalTitle>Criar Desafio</ModalTitle>}
          {view === 'delete' && <ModalTitle>Excluir Desafio</ModalTitle>}
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>

        {view === 'accept' && (
          <Form onSubmit={handleAcceptSubmit(onAccept)}>
            <Label>
              Modelo do Desafio
              <Select {...registerAccept('templateId')} disabled={loading}>
                <option value="">Selecione um desafio...</option>
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.title} ({t.duration_days} dias)</option>
                ))}
              </Select>
              {acceptErrors.templateId && <ErrorMessage>{acceptErrors.templateId.message}</ErrorMessage>}
            </Label>

            <SubmitButton type="submit" disabled={isAccepting || loading}>
              {isAccepting ? 'Aceitando...' : 'Aceitar Desafio'}
            </SubmitButton>

            {templates.length >= 10 ? (
              <>
                <ErrorMessage style={{ textAlign: 'center', marginTop: '8px' }}>
                  Limite de 10 modelos de desafios no catálogo atingido.
                </ErrorMessage>
                <SecondaryButton type="button" onClick={() => setView('delete')}>
                  Excluir um desafio
                </SecondaryButton>
              </>
            ) : (
              <SecondaryButton type="button" onClick={() => setView('create')}>
                Criar Desafio
              </SecondaryButton>
            )}

            {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
          </Form>
        )}

        {view === 'create' && (
          <Form onSubmit={handleNewSubmit(onCreate)}>
            <Label>
              Título
              <Input {...registerNew('title')} placeholder="Ex: Aprender sobre IA" disabled={isCreating} />
              {newErrors.title && <ErrorMessage>{newErrors.title.message}</ErrorMessage>}
            </Label>
            <Label>
              Descrição
              <TextArea {...registerNew('description')} placeholder="O que você fará?" disabled={isCreating} />
              {newErrors.description && <ErrorMessage>{newErrors.description.message}</ErrorMessage>}
            </Label>
            <Label>
              Duração (Dias)
              <Input type="number" {...registerNew('duration_days', { valueAsNumber: true })} placeholder="Ex: 30" disabled={isCreating} />
              {newErrors.duration_days && <ErrorMessage>{newErrors.duration_days.message}</ErrorMessage>}
            </Label>

            <SubmitButton type="submit" disabled={isCreating}>
              {isCreating ? 'Criando...' : 'Salvar novo Desafio'}
            </SubmitButton>
            <SecondaryButton type="button" onClick={() => setView('accept')} disabled={isCreating}>
              <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Voltar
            </SecondaryButton>

            {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
          </Form>
        )}

        {view === 'delete' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
            {templates.length === 0 ? (
              <p style={{ fontSize: '0.875rem', color: '#666', textAlign: 'center' }}>Nenhum desafio encontrado.</p>
            ) : (
              templates.map(t => (
                <TemplateRow key={t.id}>
                  <span>{t.title} ({t.duration_days}d)</span>
                  <DeleteButton onClick={() => handleDelete(t.id)} title="Excluir">
                    <Trash2 size={16} />
                  </DeleteButton>
                </TemplateRow>
              ))
            )}
            <SecondaryButton type="button" onClick={() => setView('accept')} style={{ marginTop: '16px' }}>
              <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Voltar
            </SecondaryButton>
          </div>
        )}
      </StyledCreateChallengeModal>
    </Overlay>,
    document.body
  );
};

export default CreateChallengeModal;