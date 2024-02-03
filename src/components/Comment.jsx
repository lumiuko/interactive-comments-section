import { useState } from 'react'
import { useUser } from '../context/UserContext'
import PostNewComment from './PostNewComment'
import ActionButton from './UI/ActionButton'
import EditComment from './EditComment'
import Modal from './UI/Modal'
import Score from './Score'
import dayjs from 'dayjs'

export default function Comment(props) {
  const { item, isReply = false, sendComment, updateComment, deleteComment, voteComment, threadId } = props
  const { currentUser } = useUser()

  const isAuthor = item.user.username === currentUser.username

  const [openedPanels, setOpenedPanels] = useState({
    reply: false,
    edit: false,
    delete: false
  })

  function updatePanel(prop, value) {
    setOpenedPanels(prevState => ({ ...prevState, [prop]: value }))
  }

  function handleDeleteCommentClick() {
    const commentData = {
      id: item.id,
      threadId
    }

    deleteComment(isReply, commentData)
    updatePanel('delete', false)
  }

  const actionButtons = (
    <>
      {isAuthor && (
        <ActionButton icon="/images/icon-delete.svg" openedPanels={openedPanels} updatePanel={updatePanel} text="Delete" color="#ED6368" />
      )}
      {isAuthor ? (
        <ActionButton text="Edit" icon="/images/icon-edit.svg" openedPanels={openedPanels} updatePanel={updatePanel} />
      ) : (
        <ActionButton text="Reply" icon="/images/icon-reply.svg" openedPanels={openedPanels} updatePanel={updatePanel} />
      )}
    </>
  )

  const replyComponent = (
    <PostNewComment isReply={true} replyTo={item} threadId={threadId} sendComment={sendComment} updatePanel={updatePanel} />
  )

  return (
    <div>
      <div className="bg-white rounded-lg p-4 flex flex-col gap-4 md:p-6 md:flex-row md:items-start md:gap-6">
        <div className="flex flex-col gap-4 md:flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <picture className="flex-shrink-0">
                <source type="image/webp" srcSet={item.user.image.webp} />
                <img src={item.user.image.png} className="size-[32px] rounded-full object-cover" alt={`${item.user.username} avatar`} />
              </picture>
              <div className="flex items-center gap-2">
                <p className="text-dark-blue font-medium">{item.user.username}</p>
                {isAuthor && (
                  <div className="bg-moderate-blue rounded-sm px-[0.375rem] py-[0.125rem] text-white leading-[0.9375rem] text-[0.8125rem] font-medium">
                    you
                  </div>
                )}
              </div>
              <p>{dayjs.unix(item.createdAt).fromNow()}</p>
            </div>
            <div className="hidden md:flex items-center gap-6 font-medium">{actionButtons}</div>
          </div>
          {openedPanels.edit && isAuthor ? (
            <EditComment item={item} threadId={threadId} updateComment={updateComment} updatePanel={updatePanel} isReply={isReply} />
          ) : (
            <p>
              {item.replyingTo && <span className="text-moderate-blue font-medium">@{item.replyingTo} </span>}
              <span>{item.content}</span>
            </p>
          )}
        </div>
        <div className="flex items-center justify-between font-medium md:-order-1">
          <Score item={item} isReply={isReply} threadId={threadId} voteComment={voteComment} />
          <div className="flex items-center gap-4 md:hidden">{actionButtons}</div>
        </div>
      </div>

      {!isReply && item.replies.length > 0 ? (
        <>
          {openedPanels.reply && replyComponent}
          <div className="mt-4 border-l-2 border-l-light-gray pl-4 flex flex-col gap-4 md:gap-6 md:mt-5 md:ml-11 md:pl-11">
            {item.replies.map(reply => (
              <Comment {...props} key={reply.id} item={reply} isReply={true} />
            ))}
          </div>
        </>
      ) : (
        openedPanels.reply && replyComponent
      )}

      <Modal
        show={openedPanels.delete}
        onClose={() => updatePanel('delete', false)}
        title="Delete comment"
        text="Are you sure you want to delete this comment? This will remove the comment and can’t be undone."
      >
        <div className="flex items-center gap-3 text-white font-medium">
          <button
            className="flex-1 p-3 rounded-lg bg-grayish-blue uppercase hover:opacity-75 transition-opacity"
            onClick={() => updatePanel('delete', false)}
          >
            No, cancel
          </button>
          <button
            className="flex-1 p-3 rounded-lg bg-soft-red uppercase hover:opacity-75 transition-opacity"
            onClick={handleDeleteCommentClick}
          >
            Yes, delete
          </button>
        </div>
      </Modal>
    </div>
  )
}
