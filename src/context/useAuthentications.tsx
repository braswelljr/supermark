'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AuthError, PostgrestError } from '@supabase/supabase-js'
import supabase from '~/supabase'
import { useToast } from '~/components/ui/toaster'
import { AuthenticationContextI, AuthenticationProviderProps, UserI, UserRequestI } from '~/types/authentication'

export const AuthenticationContext = createContext<AuthenticationContextI>({
  user: undefined,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {}
})

export function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const { toast } = useToast()
  const [initialLoading, setInitialLoading] = useState(true)
  const [user, setUser] = useState<UserI | undefined>(undefined)

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Types of auth events: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED, USER_DELETED, PASSWORD_RECOVERY
      if (session && event === 'SIGNED_IN' && session.user) {
        try {
          // check if session exists
          if (!session) throw new Error('user not logged in')

          // get user data
          const { data, error: e } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .limit(1)
            .single()

          // throw error to catch block
          if (e) throw new Error(e.message, { cause: { e } })

          if (data) setUser(data)
          else
            throw new Error('user not logged in', {
              cause: {
                error: { message: 'data not found', code: 'not found' }
              }
            })
        } catch (err) {
          const error =
            err instanceof Error
              ? err
              : (new Error(`Error logging in: ${err}`, { cause: { err } }) as AuthError | PostgrestError)

          toast({ title: 'Authentication failed', description: error.message, variant: 'error' })

          console.error(error)
        } finally {
          setInitialLoading(false)
        }
      } else if (['USER_DELETED', 'SIGNED_OUT'].includes(event)) setUser(undefined)
    })

    return () => subscription.unsubscribe()
  }, [toast])

  /**
   * signIn - Signs in a user
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   *
   * @returns {Promise<void>}
   */
  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const {
          data: { user: u, session },
          error: e
        } = await supabase.auth.signInWithPassword({ email, password })

        // check and throw error to catch block
        if (e) throw new Error(e.message, { cause: { e } })

        // check if user exists
        if (!u || !session) {
          throw new Error('user not logged in', {
            cause: { error: { message: 'authentication failed', code: 'authentication failed' } }
          })
        }

        // get user data
        const { data, error } = await supabase.from('profiles').select('*').eq('id', u.id).limit(1).single()

        // throw error to catch block
        if (error) throw new Error(error.message, { cause: { error } })

        // check if data exists
        if (!data)
          throw new Error('user not logged in', {
            cause: { error: { message: 'data not found', code: 'not found' } }
          })

        setUser(data)
        toast({ title: 'Authentication successful', description: 'Sign in successful', variant: 'success' })
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : (new Error(`Error logging in: ${err}`, { cause: { err } }) as AuthError | PostgrestError)

        toast({ title: 'Authentication failed', description: error.message, variant: 'error' })

        console.error(error)
      }
    },
    [toast]
  )

  /**
   * signUp - Signs up a user
   * @param {UserRequestI} user - The user's information
   *
   * @returns {Promise<void>}
   */
  const signUp = useCallback(
    async (params: UserRequestI) => {
      try {
        const {
          data: { user: u, session: ses },
          error: err
        } = await supabase.auth.signUp({ email: params.email, phone: params.phone, password: params.password })

        // throw error to catch block
        if (err) throw new Error(err.message, { cause: { err } })

        // check if user exists
        if (!u || !ses) {
          throw new Error('user not logged in', {
            cause: { error: { message: 'authentication failed', code: 'authentication failed' } }
          })
        }

        // insert user data
        const { data, error } = await supabase
          .from('profiles')
          .insert<UserI>({
            ...params,
            id: u.id,
            avatar: '',
            roles: ['user'],
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .single()

        // throw error to catch block
        if (error) throw new Error(error.message, { cause: { error } })

        // check if data exists
        if (!data)
          throw new Error('user not logged in', {
            cause: { error: { message: 'data not found', code: 'not found' } }
          })

        setUser(data)
        toast({ title: 'Authentication successful', description: 'Sign up successful', variant: 'success' })
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : (new Error(`Error logging in: ${err}`, { cause: { err } }) as AuthError | PostgrestError)

        toast({ title: 'Authentication failed', description: error.message, variant: 'error' })

        console.error(error)
      }
    },
    [toast]
  )

  /**
   * logout - Logs out a user
   *
   * @returns {Promise<void>}
   */
  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()

      // throw error to catch block
      if (error) throw new Error(error.message, { cause: { error } })

      setUser(undefined)
      toast({ title: 'Authentication successful', description: 'Sign out successful', variant: 'success' })
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : (new Error(`Error logging in: ${err}`, { cause: { err } }) as AuthError | PostgrestError)

      toast({ title: 'Authentication failed', description: error.message, variant: 'error' })

      console.error(error)
    }
  }, [toast])

  const memoizedValue = useMemo(() => ({ user, signIn, signUp, logout }), [user, signIn, signUp, logout])
  return (
    <AuthenticationContext.Provider value={memoizedValue}>
      {initialLoading ? 'Loading ...' : children}
    </AuthenticationContext.Provider>
  )
}

/**
 * useAuthentication - The hook for authentication
 * @returns {AuthenticationContextI}
 *
 * @example
 * const { user, setUser, register, login, logout, loading } = useAuthentication()
 */
export function useAuthentication(): AuthenticationContextI {
  return useContext(AuthenticationContext)
}
