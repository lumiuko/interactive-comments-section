import { useState, useRef } from 'react'
import Comment from './components/Comment'
import data from './data.json'
import PostNewComment from './components/PostNewComment'
import UserContextProvider from './context/UserContext'
import { getCommentsWithAdded, getCommentsWithModified, getCommentsWithDeleted } from './utils/comments'
import { wait } from './utils/common'
import date from './utils/date'

export default function App() {
  const [comments, setComments] = useState(data.comments)
  const lastId = useRef(4)

  function sendComment(isReply, { message, user, replyTo, threadId }) {
    lastId.current++

    const newComment = {
      id: lastId.current,
      content: message.replace(/^@\w+\s/, ''),
      createdAt: date().unix(),
      score: 0,
      user,
      ...(isReply ? { replyingTo: replyTo.user.username } : { replies: [] })
    }

    setComments(prevComments => getCommentsWithAdded(prevComments, isReply, threadId, newComment))
  }

  function updateComment(isReply, { id, threadId, message }) {
    setComments(prevComments => getCommentsWithModified(prevComments, isReply, threadId, id, 'content', message.replace(/^@\w+\s/, '')))
  }

  async function deleteComment(isReply, { id, threadId }) {
    await wait(150)
    setComments(prevComments => getCommentsWithDeleted(prevComments, isReply, threadId, id))
  }

  function voteComment(isReply, { id, threadId, score }) {
    setComments(prevComments => getCommentsWithModified(prevComments, isReply, threadId, id, 'score', score))
  }

  const commentElements = comments
    .sort((a, b) => b.score - a.score)
    .map(comment => (
      <Comment
        key={comment.id}
        item={comment}
        threadId={comment.id}
        sendComment={sendComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
        voteComment={voteComment}
      />
    ))

  return (
    <UserContextProvider>
      <main className="max-w-[730px] mx-auto">
        <h1 className="sr-only">Comments</h1>
        <div className="flex flex-col gap-4 md:gap-5">
          {commentElements}
          <PostNewComment sendComment={sendComment} />
        </div>
      </main>
    </UserContextProvider>
  )
}
