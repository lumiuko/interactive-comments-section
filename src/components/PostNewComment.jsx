import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useUser } from '../context/UserContext'
import Textarea from './UI/Textarea'

export default function PostNewComment({ isReply = false, sendComment, replyTo, threadId, updatePanel }) {
  const { currentUser } = useUser()

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      message: isReply ? `@${replyTo.user.username} ` : ''
    }
  })

  function onSubmit({ message }) {
    const commentData = {
      user: currentUser,
      message,
      ...(isReply && { replyTo, threadId })
    }

    sendComment(isReply, commentData)
    reset()

    if (isReply) {
      updatePanel('reply', false)
    }
  }

  useEffect(() => {
    if (!isReply) return
    setFocus('message')
  }, [isReply, setFocus])

  const borderColor = errors.message ? '#ED6368' : ''

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg p-4 grid grid-cols-2 gap-4 items-center md:p-6 md:flex md:items-start"
      style={{ marginTop: isReply ? '0.5rem' : '' }}
    >
      <Textarea
        {...register('message', { required: true, pattern: isReply ? /@(\w+) (.+)/ : /.+/ })}
        placeholder="Add a comment…"
        style={{ gridColumn: '1 / -1', borderColor, outlineColor: borderColor }}
      />
      <picture className="justify-self-start md:shrink-0 md:-order-1">
        <source type="image/webp" srcSet={currentUser.image.webp} />
        <img
          src={currentUser.image.png}
          className="size-[32px] rounded-full object-cover md:size-[40px]"
          alt={`${currentUser.username} avatar`}
        />
      </picture>
      <button className="px-[1.875rem] py-3 rounded-lg bg-moderate-blue text-white font-medium justify-self-end uppercase hover:bg-light-grayish-blue transition-colors">
        {isReply ? 'Reply' : 'Send'}
      </button>
    </form>
  )
}
