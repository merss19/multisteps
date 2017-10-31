import * as React from 'react'
import {connect} from 'react-redux'
import * as ReactModal from 'react-modal'
import { ModalType } from './interfaces'
import { ModalTypes } from './const'
import { Button, ButtonType, ButtonTypes } from '../../components/Button'
import { Loader } from '../../components/Loader'
import { toggleModal } from './ducks'
import { selectIsOpen } from './selectors'

const style = {
	overlay: {
		backgroundColor: 'rgba(45, 43, 43, 0.85)',
		zIndex: '2'
	},
	content: {
		transform: 'translate3d(0%, -50%, 0px)',
		top: '50%',
		padding: '40px',
		maxHeight: '300px',
		maxWidth: '400px',
		borderRadius: '12px',
		margin: '0 auto',
		textAlign: 'center',
		bottom: 'auto'
	}
}

interface OwnProps  {
	isLoader: boolean
	resultText: string
	modal?: ModalType
	clickHandler?: () => void
}
type ConnectedDispatch = {
	toggleModal(data: boolean): void
}

type ConnectedState = {
	isOpen: boolean
}

const mapStateToProps = (state: any, ownProps: OwnProps): ConnectedState => ({
	isOpen: selectIsOpen(state)
})
class CustomModalComponent extends React.PureComponent<ConnectedState & OwnProps & ConnectedDispatch, {}> {

	static defaultProps = {
		isLoader: false,
		resultText: 'Ошибка сервера'
	}

	setBtn() {
		const { modal } = this.props
		let btn: ButtonType
		switch (modal) {
			case ModalTypes.success:
				btn = ButtonTypes.success
				break
			case ModalTypes.error:
				btn = ButtonTypes.error
				break
			case ModalTypes.info:
				btn = ButtonTypes.info
				break
			default:
				btn = ButtonTypes.info
				break
		}
		return btn
	}

	onClick() {
		const { toggleModal, clickHandler} = this.props
		toggleModal(false)
		if (clickHandler) {
			clickHandler()
		}
	}

	renderContent() {
		const { resultText, isLoader } = this.props
		const  btn: ButtonType = this.setBtn()
		if (isLoader) {
			return <Loader/>
		} else {
			return (
				<div>
					<h2 className='modal__title'>{resultText}</h2>
						<Button
							onClick={() => this.onClick()}
							styleBtn={btn}
						>
							Продолжить
						</Button>
				</div>
			)
		}

	}

	render() {
		const {toggleModal, isOpen} = this.props
		return (
			<div>
				<ReactModal
					isOpen={isOpen}
					style={style}
					contentLabel='Action Modal'
					onRequestClose={() => toggleModal(false)}
				>
					<div className='modal__content'>
						{this.renderContent()}
					</div>

				</ReactModal>
			</div>
		)
	}
}
const CustomModal = connect(mapStateToProps, {toggleModal})(CustomModalComponent)

export default CustomModal