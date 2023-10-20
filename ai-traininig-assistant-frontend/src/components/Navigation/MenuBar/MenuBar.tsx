import { useState } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItemProps } from 'semantic-ui-react/dist/commonjs/collections/Menu/MenuItem';

function MenuBar() {
  // Get the name of the current location from url
  const { pathname } = useLocation();
  const path = pathname === '/' ? 'home' : pathname.substring(1);
  const [activeItem, setActiveItem] = useState<string | undefined>(path);

  const handleItemClick = (
    _: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: MenuItemProps
  ) => setActiveItem(name);

  return (
    <Menu
      pointing
      secondary
      vertical
      size="large"
      fixed="left"
      color="teal"
      style={{ fontSize: '1.5rem' }}
    >
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="login"
        active={activeItem === 'login'}
        onClick={handleItemClick}
        as={Link}
        to="/login"
      />
      <Menu.Item
        name="register"
        active={activeItem === 'register'}
        onClick={handleItemClick}
        as={Link}
        to="/register"
      />
    </Menu>
  );
}

export default MenuBar;
