// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'type_motor',
  title: 'type_motor',
  type: 'group',
  children: [
    {
      id: 'type_motor',
      title: 'Type Motor',
      type: 'item',
      url: '/utils/type_motor',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
