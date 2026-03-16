import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { challengeService } from '../../../services/challenge.service';
import type { UserChallenge } from '../../../types/challenge.types';
import {
  Overlay,
  Modal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Body,
  ButtonRow,
  CancelButton,
  AbandonActionBtn,
  ErrorMessage,
  Description,
  ChallengeName,
} from './AbandonChallengeModal.styles';

interface AbandonChallengeModalProps {
  challenge: UserChallenge;
  onClose: () => void;
  onSuccess: () => void;
}

const AbandonChallengeModal: React.FC<AbandonChallengeModalProps> = ({ challenge, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const title = challenge.template?.title || `Desafio #${challenge.id}`;

  const handleAbandon = async () => {
    setIsLoading(true);
    setError('');
    try {
      await challengeService.abandonChallenge(challenge.id);
      onSuccess();
      onClose();
      toast.success('Desafio abandonado.');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error || 'Erro ao abandonar desafio';
        setError(msg);
        toast.error(msg);
      } else {
        const fallbackMsg = 'Erro inesperado';
        setError(fallbackMsg);
        toast.error(fallbackMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Abandonar Desafio</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>

        <Body>
          <Description>Tem certeza que deseja abandonar este desafio? Você não poderá retomar o progresso.</Description>
          <ChallengeName>{title}</ChallengeName>
        </Body>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonRow>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <AbandonActionBtn onClick={handleAbandon} disabled={isLoading}>
            <Trash2 size={14} style={{ marginRight: 6, display: 'inline' }} />
            {isLoading ? 'Abandonando...' : 'Abandonar'}
          </AbandonActionBtn>
        </ButtonRow>
      </Modal>
    </Overlay>,
    document.body
  );
};

export default AbandonChallengeModal;
