import { useForm } from 'react-hook-form'
import { useUser } from '../context/UserContext'
import { useEffect } from 'react'

export default function useCommentForm({ updatePanel, isReply, isEdit, item, threadId, replyTo, onSubmit }) {
  const { currentUser } = useUser()

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors }
  } = useForm({
    defaultValues: {
      message: isReply ? (isEdit ? `@${item.replyingTo} ${item.content}` : `@${replyTo.user.username} `) : isEdit ? item.content : ''
    }
  })

  useEffect(() => {
    if (!isReply && !isEdit) return
    setFocus('message')
  }, [isReply, setFocus, isEdit])

  function submitHandler({ message }) {
    if (isEdit || isReply) {
      updatePanel(isEdit ? 'edit' : 'reply', false)
    }

    const commentData = {
      message,
      threadId,
      ...(isEdit ? { id: item.id } : { user: currentUser }),
      ...(isReply && { replyTo, threadId })
    }

    onSubmit(isReply, commentData)
    reset()
  }

  const borderColor = errors.message ? '#ED6368' : ''

  return {
    register,
    handleSubmit: handleSubmit(submitHandler),
    borderColor
  }
}
