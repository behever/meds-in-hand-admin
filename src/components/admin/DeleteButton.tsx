'use client'

import { useRef } from 'react'

interface DeleteButtonProps {
  label: string
  action: (formData: FormData) => Promise<void>
  idName: string
  idValue: string
}

export function DeleteButton({ label, action, idName, idValue }: DeleteButtonProps) {
  const formRef = useRef<HTMLFormElement>(null)

  function handleClick() {
    if (confirm(`Delete "${label}"? This cannot be undone.`)) {
      formRef.current?.requestSubmit()
    }
  }

  return (
    <form ref={formRef} action={action}>
      <input type="hidden" name={idName} value={idValue} />
      <button
        type="button"
        onClick={handleClick}
        className="text-xs border border-red-200 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition-all font-medium"
      >
        Delete
      </button>
    </form>
  )
}
