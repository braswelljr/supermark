export type AuthenticationContextI = {
  user?: UserI
  signUp: (user: UserRequestI) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export type Roles = 'admin' | 'moderator' | 'user'

export type UserI = {
  id: string
  email: string
  name: string
  phone: string
  roles: Array<Roles>
  avatar: string
  createdAt: Date
  updatedAt: Date
}

export type UserRequestI = {
  name: string
  email: string
  phone: string
  avatar?: File
  password: string
}

export interface AuthenticationProviderProps {
  children: React.ReactNode
  className?: string
}
