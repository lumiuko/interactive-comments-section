import { useState } from 'react'
import { useRef } from 'react'

export default function Score({ item, isReply, threadId, voteComment }) {
  const [currentVote, setCurrentVote] = useState(0)
  const score = useRef(item.score)

  function handleVoteClick(newScore) {
    const params = {
      id: item.id,
      threadId
    }

    if (currentVote + newScore > 1 || currentVote + newScore < -1) {
      setCurrentVote(0)
      voteComment(isReply, { ...params, score: score.current })
      return
    }

    setCurrentVote(newScore)
    voteComment(isReply, { ...params, score: score.current + newScore })
  }

  return (
    <div className="bg-very-light-gray rounded-[0.625rem] px-3 py-[0.625rem] flex items-center gap-4 md:flex-col md:gap-5 md:py-[0.875rem] md:w-[40px]">
      <button
        aria-label="Upvote this comment"
        className="text-light-grayish-blue hover:text-moderate-blue transition-colors"
        style={{ color: currentVote === 1 ? '#5357B6' : '' }}
        onClick={() => handleVoteClick(1)}
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.33018 10.896C6.46674 10.896 6.58468 10.8463 6.684 10.747C6.78331 10.6477 6.83297 10.5298 6.83297 10.3932V7.004H10.1477C10.2842 7.004 10.4022 6.95434 10.5015 6.85503C10.6008 6.75571 10.6505 6.63777 10.6505 6.50121V5.27216C10.6505 5.1356 10.6008 5.01766 10.5015 4.91834C10.4022 4.81903 10.2842 4.76937 10.1477 4.76937H6.83297V1.39879C6.83297 1.26223 6.78331 1.14429 6.684 1.04497C6.58468 0.945655 6.46674 0.895996 6.33018 0.895996H4.91491C4.77835 0.895996 4.66041 0.945655 4.56109 1.04497C4.46177 1.14429 4.41212 1.26223 4.41212 1.39879V4.76937H1.07878C0.942221 4.76937 0.824282 4.81903 0.724965 4.91834C0.625647 5.01766 0.575989 5.1356 0.575989 5.27216V6.50121C0.575989 6.63777 0.625647 6.75571 0.724965 6.85503C0.824282 6.95434 0.942221 7.004 1.07878 7.004H4.41212V10.3932C4.41212 10.5298 4.46177 10.6477 4.56109 10.747C4.66041 10.8463 4.77835 10.896 4.91491 10.896H6.33018Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <p className="leading-5 text-moderate-blue">{item.score}</p>
      <button
        aria-label="Downvote this comment"
        className="text-light-grayish-blue hover:text-moderate-blue transition-colors"
        style={{ color: currentVote === -1 ? '#5357B6' : '' }}
        onClick={() => handleVoteClick(-1)}
      >
        <svg width="10" height="3" viewBox="0 0 10 3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.25591 2.66C9.46018 2.66 9.63659 2.60445 9.78515 2.49334C9.93371 2.38223 10.008 2.25028 10.008 2.0975V0.722504C10.008 0.569726 9.93371 0.437781 9.78515 0.32667C9.63659 0.215559 9.46018 0.160004 9.25591 0.160004H0.760085C0.555814 0.160004 0.379398 0.215559 0.230837 0.32667C0.082276 0.437781 0.00799561 0.569726 0.00799561 0.722504V2.0975C0.00799561 2.25028 0.082276 2.38223 0.230837 2.49334C0.379398 2.60445 0.555814 2.66 0.760085 2.66H9.25591Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  )
}
