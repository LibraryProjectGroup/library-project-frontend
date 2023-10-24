import Borrow from './borrow.interface'
import User from './user.interface'

interface ContextData {
  user: User | null
  setUser: Function
  setIsLogin: Function
  borrows: Borrow[]
  fetchBorrows: Function
}

export default ContextData
