interface NavItems {
  id: string;
  item: string;
}
export interface MobileNavMenuProps {
  isOpen: boolean;
  navItems: NavItems[];
  activeItem: string;
  setActiveItem: (id: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export interface DesktopNavLinksProps {
  navItems: NavItems[];
  activeItem: string;
  setActiveItem: (id: string) => void;
}
