/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { challengeService } from '../../services/challenge.service';
import { useAppCache } from '../../store/appCache';
import type { UserChallenge } from '../../types/challenge.types';
import ActiveChallengeCard from './components/ActiveChallengeCard';
import CreateChallengeModal from './components/CreateChallengeModal';
import ChallengeHistoryItem from './components/ChallengeHistoryItem';
import {
  Container, Header, TitleGroup, Title, TitleSub, CreateButton,
  Section, SectionTitle, EmptyState, EmptyIcon, EmptyTitle, EmptySubtitle,
  ErrorMessage,
} from './ChallengesPage.styles';
import { Target } from 'lucide-react';

const ChallengesPage = () => {
  const cache = useAppCache();

  const hasCache = cache.activeUserChallenge !== null || cache.userChallenges.length > 0;
  const [loading, setLoading] = useState(!hasCache);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const [active, list] = await Promise.all([
        challengeService.getActiveChallenge().catch(() => null),
        challengeService.listMyChallenges().catch(() => [] as UserChallenge[]),
      ]);

      cache.setChallenges({
        activeUserChallenge: active,
        userChallenges: list,
      });
    } catch {
      if (!silent) setError('Erro ao carregar desafios');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(hasCache);
  }, []);

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  const { activeUserChallenge, userChallenges } = cache;

  const historyChallenges = userChallenges.filter(
    (c) => c.status === 'COMPLETED' || c.status === 'ABANDONED'
  );

  return (
    <Container>
      <Header>
        <TitleGroup>
          <Title>Desafios</Title>
          <TitleSub>Acompanhe seu progresso e conquiste a sua melhor versão.</TitleSub>
        </TitleGroup>
        <CreateButton onClick={() => setShowModal(true)}>
          <Plus size={15} /> Novo Desafio
        </CreateButton>
      </Header>

      {activeUserChallenge && (
        <Section>
          <SectionTitle>Desafio Ativo</SectionTitle>
          <ActiveChallengeCard challenge={activeUserChallenge} />
        </Section>
      )}

      <Section>
        <SectionTitle>Histórico</SectionTitle>
        {historyChallenges.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {historyChallenges.map((challenge) => (
              <ChallengeHistoryItem key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <EmptyState>
            <EmptyIcon><Target size={20} /></EmptyIcon>
            <EmptyTitle>Nenhum desafio concluído ou abandonado</EmptyTitle>
            <EmptySubtitle>Seu histórico de conquistas aparecerá aqui.</EmptySubtitle>
          </EmptyState>
        )}
      </Section>

      {showModal && (
        <CreateChallengeModal
          onClose={() => setShowModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </Container>
  );
};

export default ChallengesPage;