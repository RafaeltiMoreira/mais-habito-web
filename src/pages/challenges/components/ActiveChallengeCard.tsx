import type { FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { challengeService } from '../../../services/challenge.service';
import type { UserChallenge } from '../../../types/challenge.types';
import AbandonChallengeModal from './AbandonChallengeModal';
import {
  Card, CardHeader, ChallengeName, StatusBadge,
  ProgressSection, ProgressHeader, ProgressLabel,
  FinishButton, ErrorMessage, NotesTextArea, CompleteButton, AbandonButton
} from './ActiveChallengeCard.styles';

interface ActiveChallengeCardProps {
  challenge: UserChallenge;
}

const ActiveChallengeCard: FC<ActiveChallengeCardProps> = ({ challenge }) => {
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState(challenge.notes || '');
  const [savingNotes, setSavingNotes] = useState(false);
  const [showAbandonModal, setShowAbandonModal] = useState(false);

  const title = challenge.template?.title || `Desafio #${challenge.id}`;
  const description = challenge.template?.description || '';
  const durationDays = challenge.template?.duration_days || 0;

  const startDate = new Date(challenge.start_date);
  const today = new Date();
  const diffMs = today.getTime() - startDate.getTime();
  const daysElapsed = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  const handleFinish = async () => {
    setFinishing(true);
    setError(null);
    try {
      await challengeService.completeChallenge(challenge.id);
      window.location.reload();
    } catch {
      setError('Erro ao finalizar desafio. Tente novamente.');
    } finally {
      setFinishing(false);
    }
  };

  const handleAbandonClick = () => {
    setShowAbandonModal(true);
  };

  const handleAbandonSuccess = () => {
    window.location.reload();
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    setError(null);
    try {
      await challengeService.updateNotes(challenge.id, notes);
      toast.success('Anotações salvas com sucesso!');
    } catch {
      setError('Erro ao salvar anotações.');
      toast.error('Erro ao salvar anotações.');
    } finally {
      setSavingNotes(false);
    }
  };

  const statusLabel: Record<string, string> = {
    ACTIVE: 'Ativo',
    COMPLETED: 'Concluído',
    ABANDONED: 'Abandonado',
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <ChallengeName>{title}</ChallengeName>
          {description && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #999)', marginTop: '4px', lineHeight: 1.4 }}>
              {description}
            </p>
          )}
        </div>
        <StatusBadge>{statusLabel[challenge.status] || challenge.status}</StatusBadge>
      </CardHeader>

      <ProgressSection>
        <ProgressHeader>
          <ProgressLabel>Começou em: {startDate.toLocaleDateString('pt-BR')}</ProgressLabel>
          {durationDays > 0 && (
            <ProgressLabel style={{ fontWeight: 600 }}>
              Dia {daysElapsed} de {durationDays}
            </ProgressLabel>
          )}
        </ProgressHeader>
      </ProgressSection>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'inherit', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Anotações de progresso
        </label>
        <NotesTextArea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Escreva sobre seu progresso neste desafio..."
          rows={3}
          maxLength={500}
        />
        <FinishButton 
          onClick={handleSaveNotes} 
          disabled={savingNotes}
          style={{ width: 'fit-content', padding: '6px 12px', fontSize: '0.75rem', marginTop: '4px' }}
        >
          {savingNotes ? 'Salvando...' : 'Salvar Anotações'}
        </FinishButton>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <CompleteButton onClick={handleFinish} disabled={finishing}>
          {finishing ? 'Processando...' : '✅ Completar Desafio'}
        </CompleteButton>
        <AbandonButton onClick={handleAbandonClick} disabled={finishing}>
          Abandonar
        </AbandonButton>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {showAbandonModal && (
        <AbandonChallengeModal
          challenge={challenge}
          onClose={() => setShowAbandonModal(false)}
          onSuccess={handleAbandonSuccess}
        />
      )}
    </Card>
  );
};

export default ActiveChallengeCard;