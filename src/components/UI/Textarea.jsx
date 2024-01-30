import { forwardRef } from 'react'

const Textarea = forwardRef((props, ref) => (
  <textarea
    {...props}
    className="flex-1 px-6 py-3 rounded-lg border-[1px] border-x-light-gray min-h-24 text-dark-blue resize-none outline-moderate-blue"
    ref={ref}
  />
))

Textarea.displayName = 'Textarea'
export default Textarea
