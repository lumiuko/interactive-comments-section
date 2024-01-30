/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import data from '../data.json'
import { useState } from 'react'
import { useContext } from 'react'

const UserContext = createContext()

export default function UserContextProvider({ children }) {
  const [currentUser] = useState(data.currentUser)

  return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
}

function useUser() {
  return useContext(UserContext)
}

export { UserContext, UserContextProvider, useUser }
