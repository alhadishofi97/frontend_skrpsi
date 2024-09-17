// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'user',
  title: 'user',
  type: 'group',
  children: [
    {
      id: 'user',
      title: 'user',
      type: 'item',
      url: '/utils/user',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
