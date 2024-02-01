import Textarea from './UI/Textarea'
import useCommentForm from '../hooks/useCommentForm'

export default function EditComment({ item, updateComment, updatePanel, threadId, isReply }) {
  const { register, handleSubmit, borderColor } = useCommentForm({
    isEdit: true,
    onSubmit: updateComment,
    item,
    isReply,
    updatePanel,
    threadId
  })

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
