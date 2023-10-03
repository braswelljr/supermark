import { FaCog, FaCreditCard, FaStore, FaWallet } from 'react-icons/fa'
import { HiArchive } from 'react-icons/hi'
import { MdQueryStats } from 'react-icons/md'
import { TbUsers } from 'react-icons/tb'

export const DASHBOARD_NAV_LINKS = {
  Dashboard: {
    page: '/dashboard',
    icon: MdQueryStats
  },
  Users: {
    page: '/dashboard/users',
    icon: TbUsers
  },
  Shops: {
    page: '/dashboard/shops',
    icon: FaStore
  },
  Orders: {
    page: '/dashboard/orders',
    icon: HiArchive
  },
  Requests: {
    page: '/dashboard/requests',
    icon: FaWallet
  },
  Transactions: {
    page: '/dashboard/transactions',
    icon: FaCreditCard
  },
  Settings: {
    page: '/dashboard/settings',
    icon: FaCog
  }
}
