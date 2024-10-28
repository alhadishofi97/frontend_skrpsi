import { IconUsersGroup, IconShoppingCart, IconReport, IconUser, IconUserCheck, IconShoppingBag, IconBusinessplan, IconBrandUbuntu, IconCash } from '@tabler/icons-react';

// constant
const icons = {
  IconUser,
  IconShoppingCart,
  IconReport,
  IconUsersGroup,
  IconUserCheck,
  IconShoppingBag,
  IconBusinessplan,
  IconBrandUbuntu,
  IconCash,
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
      icon: icons.IconUsersGroup,
      breadcrumbs: false
    },
    {
      id: 'util-user',
      title: 'User',
      type: 'item',
      url: '/utils/util-user',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'util-customer',
      title: 'Customer',
      type: 'item',
      url: '/utils/util-customer',
      icon: icons.IconUserCheck,
      breadcrumbs: false
    },
    {
      id: 'util-barang',
      title: 'Barang',
      type: 'item',
      url: '/utils/util-barang',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    },
    {
      id: 'util-supplier',
      title: 'Supplier',
      type: 'item',
      url: '/utils/util-supplier',
      icon: icons.IconShoppingBag,
      breadcrumbs: false
    }, 
    {
      id: 'util-manageSupplier',
      title: 'Manage Supplier',
      type: 'item',
      url: '/utils/util-manageSupplier',
      icon: icons.IconBusinessplan,
      breadcrumbs: false
    },
    {
      id: 'util-pembelianStock',
      title: 'Pembelian Stock',
      type: 'item',
      url: '/utils/util-pembelianStock',
      icon: icons.IconBrandUbuntu,
    },
    {
      id: 'util-transaksi',
      title: 'Transaksi',
      type: 'item',
      url: '/utils/util-transaksi',
      icon: icons.IconCash,
    },
    {
      id: 'util-reportTracking',
      title: 'Report Tracking',
      type: 'item',
      url: '/utils/util-reportTracking',
      icon: icons.IconReport,
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
