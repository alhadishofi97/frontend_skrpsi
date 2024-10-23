// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'manageSupplier',
  title: 'Manage Supplier',
  type: 'group',
  children: [
    {
      id: 'manageSupplier',
      title: 'manageSupplier',
      type: 'item',
      url: '/utils/ManageSupplier',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
