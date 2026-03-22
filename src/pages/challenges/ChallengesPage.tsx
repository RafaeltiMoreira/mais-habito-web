/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Plus, Target, Flame, TrendingUp, Trophy, Calendar, ArrowRight, Zap } from 'lucide-react';
import { challengeService } from '../../services/challenge.service';
import { useAppCache } from '../../store/appCache';
import { userService } from '../../services/user.service';
import type { UserChallenge } from '../../types/challenge.types';
import ActiveChallengeCard from './components/ActiveChallengeCard';
import CreateChallengeModal from './components/CreateChallengeModal';
import {
  Container, Header, TitleGroup, Title, HeaderRight, StreakBadge, StreakText, CreateButton,
  TwoColumnLayout, MainColumn, AsideColumn,
  SectionLabel as _SectionLabel,
  ChallengeCardMain, ChallengeTopRow, ChallengeInfo, ChallengeActiveBadge,
  ChallengeTitleMain, ChallengeDescription,
  ProgressCircle, ProgressValue, ProgressUnit,
  ProgressBarSection, ProgressDates, ProgressBarTrack, ProgressBarFill,
  InsightRow, InsightCard, InsightIcon, InsightTitle, InsightDesc,
  AsideHeader, AsideTitle, AsideSeeAll,
  HistoryList, HistoryCard, HistoryCardTop, HistoryCardIcon, HistoryBadge,
  HistoryCardTitle, HistoryCardDesc, HistoryCardDate,
  CTACard, CTATitle, CTADesc, CTALink,
  EmptyState, EmptyIcon, EmptyTitle, EmptySubtitle,
  ErrorMessage,
} from './ChallengesPage.styles';

const ChallengesPage = () => {
  const cache = useAppCache();

  const hasCache = cache.activeUserChallenge !== null || cache.userChallenges.length > 0;
  const [loading, setLoading] = useState(!hasCache);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [totalChallenges, setTotalChallenges] = useState(0);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const [active, list, profile] = await Promise.all([
        challengeService.getActiveChallenge().catch(() => null),
        challengeService.listMyChallenges().catch(() => [] as UserChallenge[]),
        userService.getProfile().catch(() => null),
      ]);

      cache.setChallenges({
        activeUserChallenge: active,
        userChallenges: list,
      });

      if (profile) {
        cache.setProfile(profile);
      }
      setTotalChallenges(list.length);
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

  // Calculate progress for active challenge based on elapsed time
  const getProgress = (challenge: UserChallenge) => {
    const start = new Date(challenge.start_date).getTime();
    const durationDays = challenge.template?.duration_days || 14;
    const end = start + durationDays * 86400000;
    const now = Date.now();
    const elapsed = now - start;
    const total = end - start;
    return Math.min(Math.round((elapsed / total) * 100), 100);
  };

  const getDaysRemaining = (challenge: UserChallenge) => {
    const start = new Date(challenge.start_date).getTime();
    const durationDays = challenge.template?.duration_days || 14;
    const end = start + durationDays * 86400000;
    const remaining = Math.max(0, Math.ceil((end - Date.now()) / 86400000));
    return remaining;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase();
  };

  const getEndDate = (challenge: UserChallenge) => {
    const start = new Date(challenge.start_date);
    const durationDays = challenge.template?.duration_days || 14;
    return new Date(start.getTime() + durationDays * 86400000);
  };

  return (
    <Container>
      <Header>
        <TitleGroup>
          <Title>Desafios</Title>
        </TitleGroup>
        <HeaderRight>
          <StreakBadge>
            <Flame size={18} />
            <StreakText>Desafios: {totalChallenges}</StreakText>
          </StreakBadge>
          <CreateButton onClick={() => setShowModal(true)}>
            <Plus size={15} /> Novo Desafio
          </CreateButton>
        </HeaderRight>
      </Header>

      <TwoColumnLayout>
        {/* Main Column */}
        <MainColumn>
          {activeUserChallenge ? (
            <>
              {/* Active challenge overview */}
              <ChallengeCardMain>
                <ChallengeTopRow>
                  <ChallengeInfo>
                    <ChallengeActiveBadge>DESAFIO ATIVO</ChallengeActiveBadge>
                    <ChallengeTitleMain>
                      {activeUserChallenge.template?.title || `Desafio #${activeUserChallenge.template_id}`}
                    </ChallengeTitleMain>
                    <ChallengeDescription>
                      {activeUserChallenge.template?.description ||
                        `Consistência diária. Faltam ${getDaysRemaining(activeUserChallenge)} dias para concluir o ciclo de ${activeUserChallenge.template?.duration_days || 14} dias.`}
                    </ChallengeDescription>
                  </ChallengeInfo>
                  <ProgressCircle>
                    <ProgressValue>{getProgress(activeUserChallenge)}%</ProgressValue>
                    <ProgressUnit>PROGRESSO TOTAL</ProgressUnit>
                  </ProgressCircle>
                </ChallengeTopRow>

                <ProgressBarSection>
                  <ProgressDates>
                    <span>Início: {formatDate(activeUserChallenge.start_date)}</span>
                    <span>Meta: {formatDate(getEndDate(activeUserChallenge).toISOString())}</span>
                  </ProgressDates>
                  <ProgressBarTrack>
                    <ProgressBarFill $percent={getProgress(activeUserChallenge)} />
                  </ProgressBarTrack>
                </ProgressBarSection>
              </ChallengeCardMain>

              {/* Full ActiveChallengeCard component (daily log, notes, actions) */}
              <ActiveChallengeCard challenge={activeUserChallenge} />

              {/* Insights row */}
              <InsightRow>
                <InsightCard>
                  <InsightIcon><TrendingUp size={20} /></InsightIcon>
                  <InsightTitle>Seu momento</InsightTitle>
                  <InsightDesc>
                    {(cache.profile?.current_streak || 0) > 1
                      ? `Você está ${cache.profile?.current_streak} dias consistente. Continue assim!`
                      : 'Comece sua sequência completando o desafio de hoje.'}
                  </InsightDesc>
                </InsightCard>
                <InsightCard>
                  <InsightIcon><Trophy size={20} color="#FFA726" /></InsightIcon>
                  <InsightTitle>Recompensa</InsightTitle>
                  <InsightDesc>
                    Suba de nível e desbloqueie novas recompensas!
                  </InsightDesc>
                </InsightCard>
              </InsightRow>
            </>
          ) : (
            <EmptyState>
              <EmptyIcon><Target size={20} /></EmptyIcon>
              <EmptyTitle>Nenhum desafio ativo</EmptyTitle>
              <EmptySubtitle>Aceite um novo desafio para começar sua jornada!</EmptySubtitle>
            </EmptyState>
          )}
        </MainColumn>

        {/* Right Sidebar */}
        <AsideColumn>
          {/* History */}
          <AsideHeader>
            <AsideTitle>Histórico</AsideTitle>
            {historyChallenges.length > 0 && <AsideSeeAll>VER TODOS</AsideSeeAll>}
          </AsideHeader>

          {historyChallenges.length > 0 ? (
            <HistoryList>
              {historyChallenges.slice(0, 3).map((challenge) => (
                <HistoryCard key={challenge.id}>
                  <HistoryCardTop>
                    <HistoryCardIcon>
                      {challenge.status === 'COMPLETED' ? <Calendar size={16} /> : <Zap size={16} />}
                    </HistoryCardIcon>
                    <HistoryBadge $status={challenge.status}>
                      {challenge.status === 'COMPLETED' ? 'CONCLUÍDO' : 'ABANDONADO'}
                    </HistoryBadge>
                  </HistoryCardTop>
                  <HistoryCardTitle>
                    {challenge.template?.title || `Desafio #${challenge.template_id}`}
                  </HistoryCardTitle>
                  <HistoryCardDesc>
                    {challenge.template?.description || 'Sem descrição'}
                  </HistoryCardDesc>
                  <HistoryCardDate>
                    {challenge.completed_at
                      ? new Date(challenge.completed_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()
                      : ''}
                  </HistoryCardDate>
                </HistoryCard>
              ))}
            </HistoryList>
          ) : (
            <EmptyState>
              <EmptyIcon><Target size={20} /></EmptyIcon>
              <EmptyTitle>Sem histórico</EmptyTitle>
              <EmptySubtitle>Suas conquistas aparecerão aqui.</EmptySubtitle>
            </EmptyState>
          )}

          {/* CTA */}
          <CTACard>
            <CTATitle>Pronto para o próximo?</CTATitle>
            <CTADesc>Aceite novos desafios para acumular mais pontos e manter sua sequência ativa.</CTADesc>
            <CTALink onClick={() => setShowModal(true)}>
              EXPLORAR NOVOS DESAFIOS <ArrowRight size={14} />
            </CTALink>
          </CTACard>
        </AsideColumn>
      </TwoColumnLayout>

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