import {
  LayoutGrid,
  Target,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Sun,
  Moon,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
import {
  SidebarWrapper,
  SidebarNav,
  SidebarItem,
  SidebarLabel,
  CollapseButton,
  LogoutButton,
  SidebarHeader,
  SidebarLogo,
  ThemeToggle,
  SidebarFooter,
  NewHabitButton,
} from "./Sidebar.styles";
import React from "react";

interface SidebarProps {
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapseChange }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  const navItems = [
    { path: "/dashboard", icon: LayoutGrid, label: "INÍCIO" },
    { path: "/challenges", icon: Target, label: "DESAFIOS" },
    { path: "/tasks", icon: CheckSquare, label: "TAREFAS" },
    { path: "/profile", icon: User, label: "PERFIL" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <SidebarWrapper $collapsed={collapsed}>
      <CollapseButton
        onClick={() => onCollapseChange(!collapsed)}
        type="button"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </CollapseButton>

      <SidebarHeader>
        <SidebarLogo $collapsed={collapsed}>
          <span>Mais</span>
          <span>Hábito</span>
        </SidebarLogo>
      </SidebarHeader>

      <SidebarNav>
        {navItems.map(({ path, icon: Icon, label }) => (
          <SidebarItem key={path} to={path} $collapsed={collapsed}>
            <Icon size={20} />
            <SidebarLabel $collapsed={collapsed}>{label}</SidebarLabel>
          </SidebarItem>
        ))}
      </SidebarNav>

      <NewHabitButton $collapsed={collapsed} onClick={() => navigate('/tasks')} type="button">
        <Plus size={18} />
        <SidebarLabel $collapsed={collapsed}>Novo Hábito</SidebarLabel>
      </NewHabitButton>

      <SidebarFooter>
        <ThemeToggle onClick={toggleTheme} type="button" $collapsed={collapsed}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDark ? 'CLARO/ESCURO' : 'CLARO/ESCURO'}</span>
        </ThemeToggle>

        <LogoutButton onClick={handleLogout} type="button" $collapsed={collapsed}>
          <LogOut size={20} />
          <span>SAIR</span>
        </LogoutButton>
      </SidebarFooter>
    </SidebarWrapper>
  );
};

export default Sidebar;
