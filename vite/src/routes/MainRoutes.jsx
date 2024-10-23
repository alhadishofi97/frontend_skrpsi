import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsGroup = Loadable(lazy(() => import('views/utilities/Group')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/User')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Customer')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/Barang')));
const UtilsSupplier = Loadable(lazy(() => import('views/utilities/Supplier')));
const UtilsManageSupplier = Loadable(lazy(() => import('views/utilities/ManageSupplier')));
const UtilsPembelianStock = Loadable(lazy(() => import('views/utilities/PembelianStock')));
const UtilsTransaksi = Loadable(lazy(() => import('views/utilities/Transaksi')));
const UtilsTypeMotor = Loadable(lazy(() => import('views/utilities/TypeMotor')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-group',
          element: <UtilsGroup />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-user',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-customer',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-barang',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-supplier',
          element: <UtilsSupplier />
        }
      ]
    },
    {
      path: 'utils',
      children: [
      {
        path: 'util-manageSupplier',
        element: <UtilsManageSupplier />
      }
      ]
    },
    {
      path: 'utils',
      children: [
      {
        path: 'util-pembelianStock',
        element: <UtilsPembelianStock />
      }
      ]
    },
    {
      path: 'utils',
      children: [
      {
        path: 'util-transaksi',
        element: <UtilsTransaksi />
      }
      ]
    },
    {
      path: 'utils',
      children: [
      {
        path: 'util-type_motor',
        element: <UtilsTypeMotor />
      }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
