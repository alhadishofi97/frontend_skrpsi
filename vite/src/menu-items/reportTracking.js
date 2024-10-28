// assets
import { IconShoppingCart, IconReport } from '@tabler/icons-react';

// constant
const icons = { IconShoppingCart, IconReport };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'reportTracking',
  title: 'Report Tracking',
  type: 'group',
  children: [
    {
      id: 'reportTracking',
      title: 'Report Tracking',
      type: 'item',
      url: '/utils/util-reportTracking',
      icon: icons.IconReport,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
