import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type OpenState = 'opened' | 'closed'

interface store {
  dashboardnavIsOpen: OpenState
  setDashboardnavIsOpen: (isOpen: OpenState) => void
}

export default create<store>()(
  devtools(set => ({
    dashboardnavIsOpen: 'closed',
    setDashboardnavIsOpen: (value: OpenState) => set(state => ({ ...state, dashboardnavIsOpen: value }))
  }))
)
