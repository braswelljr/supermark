'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CustomInput } from '~/components/shared/inputs'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import useAuthentication from '~/context/useAuthentication'

type Inputs = {
  email: string
  password: string
}

export default function Page() {
  const router = useRouter()
  const { signIn } = useAuthentication()
  const {
    register,
    handleSubmit,
    formState: { isLoading, isSubmitting, errors }
  } = useForm<Inputs>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<Inputs> = async data =>
    await signIn(data.email, data.password).then(() => router.push('/'))

  return (
    <main className="flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-md px-5">
        <div className="">
          <h1 className="text-center text-2xl font-bold uppercase">Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <CustomInput
            id="email"
            label="Email"
            required
            aria-required="true"
            placeholder="doejohn@gmail.com"
            type="text"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Invalid email'
              }
            })}
            error={errors.email}
          />
          <CustomInput
            id="password"
            label="Password"
            required
            aria-required="true"
            placeholder="********"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be 8 or more letters'
              }
            })}
            error={errors.password}
          />
          <Button type="submit" className="h-12 w-full font-semibold">
            {isSubmitting || isLoading ? <Spinner className="h-4 w-5" /> : 'Submit'}
          </Button>
        </form>
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
    </main>
  )
}
