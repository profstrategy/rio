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
