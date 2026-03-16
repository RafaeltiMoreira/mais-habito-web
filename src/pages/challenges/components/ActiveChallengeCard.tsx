import type { FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { challengeService } from '../../../services/challenge.service';
import type { UserChallenge } from '../../../types/challenge.types';
import AbandonChallengeModal from './AbandonChallengeModal';
import {
  Card, CardHeader, ChallengeName, StatusBadge,
  ProgressSection, ProgressHeader, ProgressLabel,
  FinishButton, ErrorMessage, NotesTextArea, CompleteButton, AbandonButton,
  LogsContainer, LogEntry, LogDate, LogText
} from './ActiveChallengeCard.styles';

export interface DailyLog {
  id: string;
  date: string;
  text: string;
}

interface ActiveChallengeCardProps {
  challenge: UserChallenge;
}

const ActiveChallengeCard: FC<ActiveChallengeCardProps> = ({ challenge }) => {
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const initialLogs = (): DailyLog[] => {
    if (!challenge.notes) return [];
    try {
      const parsed = JSON.parse(challenge.notes);
      if (Array.isArray(parsed)) {
        return parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      return [{ id: 'legacy', date: challenge.start_date, text: challenge.notes }];
    } catch {
      return [{ id: 'legacy', date: challenge.start_date, text: challenge.notes }];
    }
  };

  const [logs, setLogs] = useState<DailyLog[]>(initialLogs());
  const [newNote, setNewNote] = useState('');
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
    if (!newNote.trim()) return;
    setSavingNotes(true);
    setError(null);
    try {
      const newLog: DailyLog = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        text: newNote.trim(),
      };
      
      const updatedLogs = [newLog, ...logs];
      const serialized = JSON.stringify(updatedLogs);

      await challengeService.updateNotes(challenge.id, serialized);
      setLogs(updatedLogs);
      setNewNote('');
      toast.success('Progresso diário registrado com sucesso!');
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
          Diário do Desafio
        </label>
        
        {logs.length > 0 && (
          <LogsContainer>
            {logs.map(log => (
              <LogEntry key={log.id}>
                <LogDate>
                  {new Date(log.date).toLocaleDateString('pt-BR', { 
                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
                  }).replace(' de ', ' ')}
                </LogDate>
                <LogText>{log.text}</LogText>
              </LogEntry>
            ))}
          </LogsContainer>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
          <NotesTextArea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Relate seu progresso diário..."
            rows={2}
            maxLength={500}
          />
          <FinishButton 
            onClick={handleSaveNotes} 
            disabled={savingNotes || !newNote.trim()}
            style={{ width: 'fit-content', padding: '6px 12px', fontSize: '0.75rem' }}
          >
            {savingNotes ? 'Registrando...' : 'Registrar Progresso'}
          </FinishButton>
        </div>
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