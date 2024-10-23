import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'List Menu',
  type: 'group',
  children: [
    {
      id: 'util-group',
      title: 'Group',
      type: 'item',
      url: '/utils/util-group',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-user',
      title: 'User',
      type: 'item',
      url: '/utils/util-user',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-customer',
      title: 'Customer',
      type: 'item',
      url: '/utils/util-customer',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-barang',
      title: 'Barang',
      type: 'item',
      url: '/utils/util-barang',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-supplier',
      title: 'Supplier',
      type: 'item',
      url: '/utils/util-supplier',
      icon: icons.IconShadow,
      breadcrumbs: false
    }, 
    {
      id: 'util-manageSupplier',
      title: 'Manage Supplier',
      type: 'item',
      url: '/utils/util-manageSupplier',
      icon: icons.IconWindmill,
      breadcrumbs: false
    },
    {
      id: 'util-pembelianStock',
      title: 'Pembelian Stock',
      type: 'item',
      url: '/utils/util-pembelianStock',
    },
    {
      id: 'util-transaksi',
      title: 'Transaksi',
      type: 'item',
      url: '/utils/util-transaksi',
    },
    {
      id: 'util-type_motor',
      title: 'Type Motor',
      type: 'item',
      url: '/utils/util-type_motor',
    },
  ]
};

export default utilities;
