import { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import type { MenuItemProps } from 'semantic-ui-react/dist/commonjs/collections/Menu/MenuItem';

function MenuBar() {
  // Get the name of the current location from url
  const { pathname } = window.location;
  const path = pathname === '/' ? 'home' : pathname.substring(1);

  const [activeItem, setActiveItem] = useState<string | undefined>(path);

  const handleItemClick = (
    _: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: MenuItemProps
  ) => setActiveItem(name);

  return (
    <Menu pointing secondary vertical size="large">
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
