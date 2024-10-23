// assets
import { IconShoppingCart } from '@tabler/icons-react';

// constant
const icons = { IconShoppingCart };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'pembelianStock',
  title: 'Pembelian Stock',
  type: 'group',
  children: [
    {
      id: 'pembelianStock',
      title: 'Pembelian Stock',
      type: 'item',
      url: '/utils/PembelianStock',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
