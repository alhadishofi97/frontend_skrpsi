// assets
import { IconUsersGroup } from '@tabler/icons-react';
// constant
const icons = { IconUsersGroup };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'group',
  title: 'group',
  type: 'group',
  children: [
    {
      id: 'group',
      title: 'group',
      type: 'item',
      url: '/utils/group',
      icon: icons.IconUsersGroup,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
