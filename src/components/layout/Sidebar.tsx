import { useNavigate } from "react-router-dom";
import {
  Home,
  Target,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Sun,
  Moon,
} from "lucide-react";
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
    { path: "/dashboard", icon: Home, label: "Início" },
    { path: "/challenges", icon: Target, label: "Desafios" },
    { path: "/tasks", icon: CheckSquare, label: "Tarefas" },
    { path: "/profile", icon: User, label: "Perfil" },
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

      <SidebarFooter>
        <ThemeToggle onClick={toggleTheme} type="button" $collapsed={collapsed}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDark ? 'Claro' : 'Escuro'}</span>
        </ThemeToggle>

        <LogoutButton onClick={handleLogout} type="button" $collapsed={collapsed}>
          <LogOut size={20} />
          <span>Sair</span>
        </LogoutButton>
      </SidebarFooter>
    </SidebarWrapper>
  );
};

export default Sidebar;
