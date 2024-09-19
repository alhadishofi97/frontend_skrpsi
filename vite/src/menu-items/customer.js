// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'customer',
  title: 'customer',
  type: 'group',
  children: [
    {
      id: 'customer',
      title: 'customer',
      type: 'item',
      url: '/utils/customer',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
