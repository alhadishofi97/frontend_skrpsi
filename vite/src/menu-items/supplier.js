// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'supplier',
  title: 'supplier',
  type: 'group',
  children: [
    {
      id: 'supplier',
      title: 'supplier',
      type: 'item',
      url: '/utils/supplier',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
