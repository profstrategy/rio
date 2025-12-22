interface NavItems {
  id: string;
  item: string;
}
export interface MobileNavMenuProps {
  isOpen: boolean;
  navItems: NavItems[];
  activeItem: string;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  openDialog: () => void;
  dialogProps: {
    open: boolean,
    title: string,
    confirmText: string,
    cancelText: string,
    onOpenChange: () => void,
    description: string
  }
}

export interface DesktopNavLinksProps {
  navItems: NavItems[];
  activeItem: string;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  openDialog: () => void;
  dialogProps: {
    open: boolean,
    title: string,
    confirmText: string,
    cancelText: string,
    onOpenChange: () => void,
    description: string
  }
}

export interface TokenCardProps {
  id: number;
  title: string;
  value: string;
  description?: string;
}
export interface RoadmapItemProps {
  id: number;
  title: string;
  heading: string;
  details: string[];
}

export interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend?: string;
  delay?: number;
}

export interface DashboardCardProps {
  title: string;
  height?: string;
  children: React.ReactNode;
  delay?: number;
}

export interface TwitterProfile {
  data: {
    id: string
    username: string
    name: string
    profile_image_url: string
  }
}

