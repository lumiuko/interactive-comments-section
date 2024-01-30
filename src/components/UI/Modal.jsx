import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Modal({ show, onClose, title, text, children }) {
  return (
    <Transition show={show} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50"></div>
        </Transition.Child>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white max-w-[400px] flex flex-col gap-4 px-7 py-6 rounded-lg md:p-8">
              <Dialog.Title className="text-dark-blue font-medium text-xl leading-6 md:text-2xl md:leading-7">{title}</Dialog.Title>
              <Dialog.Description>{text}</Dialog.Description>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
