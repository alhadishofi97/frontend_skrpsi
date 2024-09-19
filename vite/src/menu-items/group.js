// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

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
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
