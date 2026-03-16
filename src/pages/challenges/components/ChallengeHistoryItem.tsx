import { type FC } from 'react';
import type { UserChallenge } from '../../../types/challenge.types';
import {
  Item, ItemLeft, StatusDot, ItemInfo, ItemName, ItemDate,
  ItemRight, WinnerBadge, CancelledBadge,
} from './ChallengeHistoryItem.styles';

interface ChallengeHistoryItemProps {
  challenge: UserChallenge;
}

const ChallengeHistoryItem: FC<ChallengeHistoryItemProps> = ({ challenge }) => {
  // Use completed_at or updated_at for when it finished
  const dateStr = challenge.completed_at || challenge.updated_at;
  const endDate = dateStr ? new Date(dateStr).toLocaleDateString('pt-BR') : 'Desconhecida';
  const isAbandoned = challenge.status === 'ABANDONED';
  const templateTitle = challenge.template?.title || `Desafio #${challenge.template_id}`;

  return (
    <Item>
      <ItemLeft>
        <StatusDot $cancelled={isAbandoned} />
        <ItemInfo>
          <ItemName>{templateTitle}</ItemName>
          <ItemDate>Finalizado em {endDate}</ItemDate>
        </ItemInfo>
      </ItemLeft>

      <ItemRight>
        {isAbandoned ? (
          <CancelledBadge>Abandonado</CancelledBadge>
        ) : (
          <WinnerBadge>Concluído</WinnerBadge>
        )}
      </ItemRight>
    </Item>
  );
};

export default ChallengeHistoryItem;