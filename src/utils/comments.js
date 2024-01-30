export function getCommentsWithAdded(comments, isReply, threadId, newComment) {
  return isReply
    ? comments.map(comment => (comment.id === threadId ? { ...comment, replies: [...comment.replies, newComment] } : comment))
    : [...comments, newComment]
}

export function getCommentsWithModified(comments, isReply, threadId, commentId, prop, value) {
  return comments.map(comment => {
    if (comment.id === threadId) {
      return isReply
        ? {
            ...comment,
            replies: comment.replies.map(reply => (reply.id === commentId ? { ...reply, [prop]: value } : reply))
          }
        : { ...comment, [prop]: value }
    }
    return comment
  })
}

export function getCommentsWithDeleted(comments, isReply, threadId, commentId) {
  return isReply
    ? comments.map(comment =>
        comment.id === threadId ? { ...comment, replies: comment.replies.filter(reply => reply.id !== commentId) } : comment
      )
    : comments.filter(comment => comment.id !== commentId)
}
