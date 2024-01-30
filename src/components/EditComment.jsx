import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Textarea from './UI/Textarea'

export default function EditComment({ item, updateComment, updatePanel, threadId, isReply }) {
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      message: isReply ? `@${item.replyingTo} ${item.content}` : item.content
    }
  })

  useEffect(() => {
    setFocus('message')
  }, [setFocus])

  function onSubmit({ message }) {
    const commentData = {
      id: item.id,
      message,
      threadId
    }

    updateComment(isReply, commentData)
    updatePanel('edit', false)
    reset()
  }

  const borderColor = errors.message ? '#ED6368' : ''

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        style={{ minHeight: '8rem', borderColor, outlineColor: borderColor }}
        {...register('message', { required: true, pattern: isReply ? /@(\w+) (.+)/ : /.+/ })}
      />
      <button className="px-5 py-3 rounded-lg bg-moderate-blue text-white font-medium justify-self-end uppercase hover:bg-light-grayish-blue transition-colors md:self-end">
        Update
      </button>
    </form>
  )
}
