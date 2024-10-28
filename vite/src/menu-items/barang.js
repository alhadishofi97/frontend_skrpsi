// assets
import { IconShoppingCart } from '@tabler/icons-react';

// constant
const icons = { IconShoppingCart };

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
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
