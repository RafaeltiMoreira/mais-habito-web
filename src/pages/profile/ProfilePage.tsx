/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Save, User, LogOut, ChevronRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { userService } from '../../services/user.service';
import { useAuthStore } from '../../store/authStore';
import { useAppCache } from '../../store/appCache';
import type { UpdateProfileData } from '../../types/user.types';
import {
  Container, AvatarSection, AvatarWrapper, Avatar, UserName, UserStats,
  Card, CardTitle, Form, Label, Input, SaveButton, PasswordSection, InputWrapper,
  LogoutRow, LogoutButton, LogoutLeft,
  SuccessMessage, ErrorMessage,
} from './ProfilePage.styles';

const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('E-mail inválido'),
  profile_picture: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword.length > 0 && data.newPassword.length < 6) {
    return false;
  }
  return true;
}, { message: 'A nova senha deve ter pelo menos 6 caracteres', path: ['newPassword'] });

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { setAuth, logout } = useAuthStore();
  const cache = useAppCache();
  const theme = useTheme();

  const hasCache = cache.profile !== null;
  const [loading, setLoading] = useState(!hasCache);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const storedPassword = sessionStorage.getItem('_up') || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: cache.profile?.name || '',
      email: cache.profile?.email || '',
      profile_picture: cache.profile?.profile_picture || '',
      currentPassword: sessionStorage.getItem('_up') || '',
      newPassword: '',
    },
  });

  const fetchProfile = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const profileData = await userService.getProfile();
      cache.setProfile(profileData);
      reset({
        name: profileData.name,
        email: profileData.email,
        profile_picture: profileData.profile_picture || '',
        currentPassword: sessionStorage.getItem('_up') || '',
        newPassword: '',
      });
    } catch (err) {
      if (!silent) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Erro ao carregar perfil');
        } else {
          setError('Erro desconhecido');
        }
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(hasCache);
  }, []);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updateData: UpdateProfileData = {
        name: data.name,
        email: data.email,
        profile_picture: data.profile_picture || null,
      };
      // Only send password if it was filled
      if (data.newPassword && data.newPassword.length > 0) {
        updateData.currentPassword = data.currentPassword;
        updateData.newPassword = data.newPassword;
      }
      const updatedProfile = await userService.updateProfile(updateData);
      cache.setProfile(updatedProfile);
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        setAuth(
          {
            id: updatedProfile.id,
            name: updatedProfile.name,
            email: updatedProfile.email,
          },
          currentToken,
        );
      }
      // Reset password fields after save
      reset({
        name: updatedProfile.name,
        email: updatedProfile.email,
        profile_picture: updatedProfile.profile_picture || '',
        currentPassword: sessionStorage.getItem('_up') || '',
        newPassword: '',
      });
      setSuccessMessage('Perfil atualizado com sucesso!');
      // Update stored password if it was changed
      if (data.newPassword && data.newPassword.length > 0) {
        sessionStorage.setItem('_up', data.newPassword);
      }
      toast.success('Perfil atualizado! ✨');
      setError(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || err.response?.data?.error || 'Erro ao atualizar perfil';
        setError(msg);
        toast.error(msg);
      } else {
        setError('Erro desconhecido');
      }
      setSuccessMessage(null);
    }
  };

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error && !cache.profile) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  const profile = cache.profile;
  const avatarContent = profile?.profile_picture ? '' : profile?.name.charAt(0).toLowerCase();

  return (
    <Container>
      <AvatarSection>
        <AvatarWrapper>
          <Avatar $imageUrl={profile?.profile_picture}>{avatarContent}</Avatar>
        </AvatarWrapper>
        <UserName>{profile?.name}</UserName>
        <UserStats>
          <span>{profile?.email}</span>
        </UserStats>
      </AvatarSection>

      <Card>
        <CardTitle><User size={16} color={theme.colors.primary} /> Editar Perfil</CardTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Nome
            <Input {...register('name')} placeholder="Seu nome" />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </Label>
          <Label>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color={theme.colors.primary} /> E-mail
            </span>
            <Input {...register('email')} placeholder="Seu email" type="email" />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </Label>
          <Label>
            Foto de Perfil (URL)
            <Input
              {...register('profile_picture')}
              placeholder="URL da foto (opcional)"
            />
            {errors.profile_picture && (
              <ErrorMessage>{errors.profile_picture.message}</ErrorMessage>
            )}
          </Label>
          
          <PasswordSection>
            <CardTitle style={{ fontSize: '0.875rem' }}>
              <Lock size={14} color={theme.colors.primary} /> Alterar Senha
            </CardTitle>
            <Label>
              Senha atual
              <InputWrapper>
                <Input 
                  value={storedPassword}
                  readOnly
                  type={showCurrentPassword ? "text" : "password"}
                  style={{ color: theme.colors.textSecondary }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                >
                  {showCurrentPassword ? <EyeOff size={18} color={theme.colors.textSecondary} /> : <Eye size={18} color={theme.colors.textSecondary} />}
                </button>
              </InputWrapper>
            </Label>
            <Label>
              Nova Senha
              <InputWrapper>
                <Input {...register('newPassword')} placeholder="Sua nova senha" type={showNewPassword ? "text" : "password"} />
                <button 
                  type="button" 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                >
                  {showNewPassword ? <EyeOff size={18} color={theme.colors.textSecondary} /> : <Eye size={18} color={theme.colors.textSecondary} />}
                </button>
              </InputWrapper>
              {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}
            </Label>
          </PasswordSection>

          <SaveButton type="submit" disabled={isSubmitting}>
            <Save size={15} />
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </SaveButton>
        </Form>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Card>

      <LogoutRow>
        <LogoutButton onClick={logout}>
          <LogoutLeft>
            <LogOut size={16} />
            Sair da conta
          </LogoutLeft>
          <ChevronRight size={16} />
        </LogoutButton>
      </LogoutRow>
    </Container>
  );
};

export default ProfilePage;