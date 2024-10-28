// assets
import { IconPeople } from '@tabler/icons-react';

// constant
const icons = { IconPeople };

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
      icon: icons.IconPeople,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
