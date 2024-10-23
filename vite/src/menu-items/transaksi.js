// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'transaksi',
  title: 'transaksi',
  type: 'group',
  children: [
    {
      id: 'transaksi',
      title: 'transaksi',
      type: 'item',
      url: '/utils/transaksi',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
