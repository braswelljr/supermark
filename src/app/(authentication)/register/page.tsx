'use client'

import 'react-phone-input-2/lib/style.css'
import Link from 'next/link'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import { CustomInput } from '~/components/shared/inputs'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import useAuthentication from '~/context/useAuthentication'
import { cn } from '~/utils/classNames'
import { UserRequestI } from '~/types/authentication'

export default function Page() {
  const { signUp } = useAuthentication()
  type Inputs = UserRequestI & {
    confirmPassword: string
  }
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isLoading, isSubmitting, errors }
  } = useForm<Inputs>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<Inputs> = async data =>
    await signUp({ name: data.name, email: data.email, phone: data.phone, password: data.password })

  return (
    <main className="flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-md px-5">
        <div className="">
          <h1 className="text-center text-2xl font-bold uppercase">Register</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <CustomInput
            id="name"
            label="Name"
            required
            aria-required="true"
            placeholder="John Doe"
            type="text"
            {...register('name', { required: true, minLength: 1 })}
            error={errors.name}
          />

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

          {/* Phone */}
          <div className="">
            {/* label */}
            <label htmlFor="phone" className="block pb-2 pl-2 font-medium text-neutral-700 dark:text-white">
              Phone <span className="text-red-500">*</span>
            </label>
            {/* value */}
            <Controller
              control={control}
              name="phone"
              rules={{ required: 'Phone is required' }}
              render={({ field: { ref, ...field } }) => (
                <PhoneInput
                  {...field}
                  inputProps={{
                    id: 'phone',
                    ref,
                    required: true,
                    autoFocus: false
                  }}
                  country={'gh'}
                  autoFormat
                  enableAreaCodes
                  countryCodeEditable={false}
                  containerClass="!relative !h-12 z-[2] !w-full !focus:border-0 !focus:outline-none !focus:ring-0"
                  inputClass={cn(
                    '!absolute !inset-0 !h-12 !block !w-full !pl-16 rounded border bg-white px-3 py-2.5 text-sm placeholder-neutral-400 !dark:bg-neutral-900 shadow-sm focus:outline-none focus:ring-0 sm:text-sm md:py-3',
                    {
                      'border-neutral-900 focus:border-neutral-900 focus:ring-neutral-900': !errors.phone,
                      'border-red-500 focus:border-red-500 focus:ring-red-500': errors.phone
                    }
                  )}
                  buttonClass="!bg-white !border !border-neutral-500 !border-r !rounded-l !z-10 !absolute !inset-y-0 !left-0"
                />
              )}
            />
            {/* error */}
            {errors.phone && <div className="mt-1 text-sm text-red-500">{errors.phone.message}</div>}
          </div>

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

          <CustomInput
            id="confirmPassword"
            label="Confirm Password"
            required
            aria-required="true"
            placeholder="********"
            type="password"
            {...register('confirmPassword', {
              required: 'Field is required to confirm Password',
              validate: value => value === watch('password') || 'Passwords do not match'
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
            Already have an account?{' '}
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
