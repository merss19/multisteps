import { ModalType } from './interfaces'
import { ModalTypes } from './const'
import CustomModal from './main'
import  reducer, { toggleModal } from './ducks'

const modalReducer = reducer
export { CustomModal, modalReducer, toggleModal, ModalType, ModalTypes }