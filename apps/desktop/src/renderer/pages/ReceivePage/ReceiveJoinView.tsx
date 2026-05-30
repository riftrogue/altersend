import { useState, type ChangeEvent } from 'react'
import { Button, Input } from '@altersend/components'
import { isValidJoinCode, joinSession, useTransferStore } from '@altersend/domain'

export function ReceiveJoinView() {
  const [joinKey, setJoinKey] = useState('')
  const [showValidation, setShowValidation] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const storeError = useTransferStore((s) => s.errorMessage)

  const trimmedJoinKey = joinKey.trim()
  const isValidJoinKey = isValidJoinCode(trimmedJoinKey)
  const joinKeyError =
    showValidation && trimmedJoinKey.length > 0 && !isValidJoinKey
      ? 'Enter a valid 64-character hex key.'
      : (localError ?? storeError ?? undefined)

  const join = async () => {
    setShowValidation(true)
    if (!isValidJoinKey) return
    try {
      setIsJoining(true)
      setLocalError(null)
      await joinSession(trimmedJoinKey)
    } catch (error) {
      setIsJoining(false)
      setLocalError(error instanceof Error ? error.message : 'Could not join the session.')
    }
  }

  return (
    <div className='flex h-full w-full min-w-0 flex-col overflow-y-auto pr-1'>
      <div>
        <Input
          autoCapitalize='none'
          autoComplete='off'
          disabled={isJoining}
          error={joinKeyError}
          secure
          label='Connection code'
          mono
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setJoinKey(e.currentTarget.value)
            if (showValidation) setShowValidation(false)
            if (localError) setLocalError(null)
          }}
          placeholder='Paste 64-char code…'
          spellCheck={false}
          type='text'
          value={joinKey}
        />
      </div>

      <div className='mt-3'>
        <Button disabled={isJoining} onClick={() => void join()} size='sm' variant='primary'>
          {isJoining ? 'Connecting…' : 'Connect'}
        </Button>
      </div>
    </div>
  )
}
