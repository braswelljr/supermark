'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Spinner } from '~/components/ui/spinner'
import { cn } from '~/utils/classNames'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
})

export default function Page() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <main className="flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-md px-5">
        <div className="">
          <h1 className="text-center text-2xl font-bold uppercase">Login</h1>
        </div>
        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@gmail.com"
                        autoComplete="off"
                        {...field}
                        variant={form.formState.errors.email ? 'error' : 'default'}
                        className="h-12"
                      />
                    </FormControl>
                    {form.formState.errors.email && <FormMessage>{form.formState.errors.email.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="password"
                          autoComplete="off"
                          {...field}
                          variant={form.formState.errors.password ? 'error' : 'default'}
                          className="h-12"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className={cn(
                            'absolute right-2 top-1/2 z-[1] h-7 w-7 -translate-y-1/2 rounded-md p-0',
                            form.formState.errors.password
                              ? 'bg-red-200/40 text-red-500 dark:bg-red-700/40 dark:text-red-200'
                              : 'bg-neutral-200/40 text-neutral-900'
                          )}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    {form.formState.errors.password && (
                      <FormMessage>{form.formState.errors.password.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-12 w-full font-semibold">
                {form.formState.isSubmitting || form.formState.isLoading ? <Spinner className="h-4 w-5" /> : 'Submit'}
              </Button>
            </form>
          </Form>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs font-semibold uppercase">
              <span className="bg-white px-2 text-neutral-900 dark:bg-neutral-900 dark:text-white">Or</span>
            </div>
          </div>
          <div className="text-center">
            <p className="">
              Don&rsquo;t have an account?{' '}
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
