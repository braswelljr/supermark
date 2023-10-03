'use client'

import { Dispatch, forwardRef, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import { LuTrash } from 'react-icons/lu'
import { FieldError, FieldValues, UseFormSetValue } from 'react-hook-form'
import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone'
import { Input } from '~/components/ui/input'
import { Spinner } from '~/components/ui/spinner'
import { TextArea } from '~/components/ui/textarea'
import { cn } from '~/utils/classNames'

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  required?: boolean
  placeholder?: string
  error?: FieldError
  className?: string
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ id, label, required, type = 'text', error, placeholder, className, leftAddon, rightAddon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [leftWidth, setLeftWidth] = useState<number>(0)
    const [rightWidth, setRightWidth] = useState<number>(0)
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      if (leftRef.current) setLeftWidth(leftRef.current.getBoundingClientRect().width)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      if (rightRef.current) setRightWidth(rightRef.current.getBoundingClientRect().width)
    })

    return (
      <div className={cn('', className)}>
        {/* label */}
        <label htmlFor={id} className="block pb-2 pl-2 font-medium text-neutral-700 dark:text-white">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {/* input */}
        <div className="relative flex h-12 w-full overflow-hidden">
          {/* left addon */}
          {leftAddon && (
            <div ref={leftRef} className={cn('absolute inset-y-0 left-0 z-[1] flex items-center justify-center px-3')}>
              {leftAddon}
            </div>
          )}
          <Input
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            id={id}
            autoComplete="off"
            ref={ref}
            {...props}
            placeholder={placeholder}
            variant={error ? 'error' : 'default'}
            className={cn('absolute inset-0 block w-full rounded px-3 py-2.5 shadow-sm xsm:text-base md:py-3')}
            style={{
              paddingLeft: leftAddon ? `${leftWidth}px` : undefined,
              paddingRight: rightAddon ? `${rightWidth}px` : undefined
            }}
          />
          {/* right addon */}
          {rightAddon && (
            <div
              ref={rightRef}
              className={cn('absolute inset-y-0 right-0 z-[1] flex items-center justify-center px-3')}
            >
              {rightAddon}
            </div>
          )}
          {/* visible / hide */}
          {type === 'password' && (
            <button
              type="button"
              className="absolute right-3 top-3 inline-flex h-7 w-14 items-center justify-center rounded bg-neutral-800 text-xs font-semibold uppercase text-white transition-all"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'hide' : 'show'}
            </button>
          )}
        </div>
        {/* error */}
        {error && <div className="mt-1 text-red-500">{error.message}</div>}
      </div>
    )
  }
)
CustomInput.displayName = 'CustomInput'

export interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  required?: boolean
  placeholder?: string
  error?: FieldError
  className?: string
}

export const CustomTextArea = forwardRef<HTMLTextAreaElement, CustomTextAreaProps>(
  ({ id, label, required, error, placeholder, className, ...props }, ref) => {
    return (
      <div className={cn('', className)}>
        {/* label */}
        <label htmlFor={id} className="block pb-2 pl-2 font-medium text-neutral-700 dark:text-white">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {/* input */}
        <div className="relative h-24 w-full">
          <TextArea
            id={id}
            autoComplete="off"
            ref={ref}
            {...props}
            placeholder={placeholder}
            variant={error ? 'error' : 'default'}
            className={cn('absolute inset-0 block w-full rounded px-3 py-2.5 shadow-sm xsm:text-base md:py-3')}
          />
        </div>
        {/* error */}
        {error && <div className="mt-1 text-red-500">{error.message}</div>}
      </div>
    )
  }
)
CustomTextArea.displayName = 'CustomTextarea'

export const acceptTypes = {
  '*': ['.*'],
  'image/avif': ['.avif'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  'image/svg+xml': ['.svg'],
  'image/bmp': ['.bmp'],
  'image/tiff': ['.tiff', '.tif'],
  'image/jfif': ['.jfif'],
  'image/jpe': ['.jpe'],
  'image/x-icon': ['.ico'],
  'image/*': ['.avif', '.png', '.jpg', '.jpeg', '.webp', '.svg'],
  'video/mp4': ['.mp4'],
  'video/quicktime': ['.mov'],
  'video/*': ['.mp4', '.mov'],
  'audio/*': ['.mp3'],
  'application/pdf': ['.pdf']
}

export type AcceptType = keyof typeof acceptTypes

export interface CustomDropzoneProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  required?: boolean
  placeholder?: string
  error?: FieldError
  className?: string
  accepts?: AcceptType[]
  maxFiles?: number
  maxSize?: number
  setValue?: UseFormSetValue<FieldValues>
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export const CustomDropzone = forwardRef<HTMLInputElement, CustomDropzoneProps>(
  ({ id, label, required, error, className, maxFiles, maxSize = 2000000, accepts, setValue, ...props }, ref) => {
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [rejects, setRejects] = useState<FileRejection[]>([])

    const onDrop = useCallback(
      (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
        // set the accepted files
        if (acceptedFiles && acceptedFiles.length > 0) {
          const acceptedFilesPreview = acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )

          setFiles(files ? [...files, ...acceptedFilesPreview].slice(0, maxFiles) : acceptedFilesPreview)

          setValue?.(id, files ? [...files, ...acceptedFilesPreview].slice(0, maxFiles) : acceptedFilesPreview, {
            shouldValidate: true
          })
        }

        // set the rejected files
        if (rejectedFiles && rejectedFiles.length > 0) {
          setRejects(rejectedFiles)
        }
      },
      [files, id, maxFiles, setValue]
    )

    const deleteFile = useCallback(
      (file: FileWithPreview) => {
        const newFiles = [...files]

        newFiles.splice(newFiles.indexOf(file), 1)

        if (newFiles.length > 0) {
          setFiles(newFiles)
          setValue?.(id, newFiles, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
          })
        } else {
          setFiles([])
          setValue?.(id, null, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
          })
        }
      },
      [files, id, setValue]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept:
        accepts && Array.isArray(accepts) && accepts.length > 0
          ? accepts.reduce((result, type) => ({ ...result, [type]: acceptTypes[type] }), {})
          : { a: acceptTypes['*'] },
      maxFiles,
      maxSize,
      onDrop
    })

    useEffect(() => {
      return () => {
        ;() => files.forEach(file => URL.revokeObjectURL(file.preview))
      }
    }, [files])

    return (
      <div className={cn('', className)}>
        {/* label */}
        <label htmlFor={id} className="block pb-2 pl-2 font-medium text-neutral-700 dark:text-white">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {/* input */}
        <div className="">
          <div className="relative h-24 w-full">
            <div
              ref={ref}
              {...getRootProps()}
              className={cn(
                'relative z-0 flex h-full w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed',
                isDragActive ? 'border-neutral-900' : 'border-neutral-700'
              )}
            >
              <input {...props} {...getInputProps()} />
              <p className="text-sm text-neutral-700 dark:text-white">
                Drag `{maxFiles}` drop some files here, or click to select files
              </p>
            </div>
          </div>
          {/* accepted files */}
          <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-3">
            {files.map((file: FileWithPreview) => (
              <div className="group relative h-20 w-20" key={file.name}>
                <img src={file.preview} className="h-full w-full rounded object-cover" alt={file.name} />
                <div className="absolute inset-0 hidden h-full w-full place-content-center group-hover:grid group-hover:bg-neutral-800/50">
                  <button type="button" className="" onClick={() => deleteFile(file)}>
                    <LuTrash className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* rejected files */}
          {rejects && rejects.length > 0 && (
            <div className="mt-4">
              <h5 className="font-medium text-red-500">Errors</h5>
              <div className="mt-1 space-y-0.5">
                {rejects.map(({ file, errors }, i) => (
                  <div key={file.name + i}>
                    <p className="text-red-500">{file.name}</p>
                    <ul className="text-xs">
                      {errors.map((e, i) => (
                        <li key={i}>{e.message}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* error */}
        {error && <div className="mt-1 text-red-500">{error.message}</div>}
      </div>
    )
  }
)
CustomDropzone.displayName = 'CustomDropzone'

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNames?: { container?: string; input?: string; label?: string }
  Handler?: () => void
  searchQuery?: string
  setSearchQuery?: Dispatch<SetStateAction<string>>
  placeholder?: string
  disabled?: boolean
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ classNames, searchQuery, setSearchQuery, Handler, placeholder, ...props }, ref) => {
    const [loading, setLoading] = useState<boolean>(false)

    // Search Handler
    useEffect(() => {
      const handler = window.setTimeout(() => Handler?.(), 250)
      return () => window.clearTimeout(handler)
    }, [Handler, searchQuery])

    // set loading with debounce
    useEffect(() => {
      const loader = window.setTimeout(() => setLoading(false), 500)
      return () => window.clearTimeout(loader)
    }, [loading])

    return (
      <div className={cn('flex px-2', classNames?.container)}>
        <label htmlFor="search-input" className={cn('flex flex-none items-center max-xsm:pr-1', classNames?.label)}>
          <span className="sr-only">Search </span>
          {loading ? (
            <Spinner className="h-4 w-5" />
          ) : (
            <HiSearch className="ml-1 h-4 w-auto text-neutral-400 transition-colors duration-150 group-focus-within:text-neutral-500" />
          )}
        </label>
        <input
          type="text"
          id="search-input"
          autoComplete="off"
          value={searchQuery}
          ref={ref}
          onChange={e => {
            setSearchQuery?.(e.target.value)
            setLoading(true)
          }}
          placeholder={`${placeholder}`}
          {...props}
          className={cn(
            'flex-auto border-0 bg-white py-1.5 text-neutral-700 placeholder-neutral-500 placeholder:text-sm focus:placeholder-neutral-400 focus:outline-none focus:ring-0 dark:bg-neutral-900 dark:text-neutral-200 sm:py-2',
            classNames?.input
          )}
        />
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'
