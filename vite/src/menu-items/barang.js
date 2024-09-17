// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'barang',
  title: 'Barang',
  type: 'group',
  children: [
    {
      id: 'Barang',
      title: 'Barang',
      type: 'item',
      url: '/utils/barang',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
