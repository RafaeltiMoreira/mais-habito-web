import { Home, Target, CheckSquare, User, Sun, Moon } from 'lucide-react';
import { Nav, NavItem, NavLabel, ThemeNavButton } from './BottomNav.styles';
import { useThemeStore } from '../../store/themeStore';

const BottomNav = () => {
  const { isDark, toggleTheme } = useThemeStore();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Início' },
    { path: '/challenges', icon: Target, label: 'Desafios' },
    { path: '/tasks', icon: CheckSquare, label: 'Tarefas' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <Nav>
      {navItems.map(({ path, icon: Icon, label }) => (
        <NavItem key={path} to={path}>
          <Icon size={24} />
          <NavLabel>{label}</NavLabel>
        </NavItem>
      ))}
      <ThemeNavButton type="button" onClick={toggleTheme}>
        {isDark ? <Sun size={22} /> : <Moon size={22} />}
        <NavLabel>{isDark ? 'Claro' : 'Escuro'}</NavLabel>
      </ThemeNavButton>
    </Nav>
  );
};

export default BottomNav;