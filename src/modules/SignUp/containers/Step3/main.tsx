import * as React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import {
	paymentInfo,
	paymentManual
} from './ducks'

import {
	selectProgram,
	selectPayment,
	selectChoosenProgram
} from './selectors'

import {selectPackage} from '../Step2'
import Cookie from '../../../../tools/cookie'
import {Steps} from '../../const'
import * as classNames from 'classNames'
import {Program} from '../../interfaces'

import {Button, ButtonTypes} from '../../../../components/Button'
import {Loader} from '../../../../components/Loader'
import * as shortid from 'shortid'
import * as md5 from 'md5'

interface OwnProps {
	isFetching: boolean
	changeStep: (data: number) => void
}
export type ConnectedState = {
	program: Program | undefined,
	choosenProgram: number
	currentPackage: any
	payment: any
}

type ConnectedDispatch = {
	paymentInfo(): void
	paymentManual(data: string, cb: () => void): void
}

const mapStateToProps = (state: any): ConnectedState => ({
	program: selectProgram(state),
	currentPackage: selectPackage(state),
	choosenProgram: selectChoosenProgram(state),
	payment: selectPayment(state)
})

class StepThreeComponent extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {

	yandex: any
	robokassa: any

	componentWillMount() {
		this.props.paymentInfo()
	}

	payManual() {
		const { paymentManual, payment, changeStep } = this.props
		paymentManual(payment.txId, () => {
			changeStep(Steps.four)
		})
	}

	renderContent() {
		const {payment, changeStep} = this.props

		if (payment.amount !== 0) {
			return (
				<div className='entry__box'>
					<h3 className='text-center mtb20'>Выберите способ оплаты:</h3>
					<ul className='options--with-img wide mb20'>
						<li className='options__item'>
							<form
								id='yaForm'
								ref={(el) => this.yandex = el}
								action='https://money.yandex.ru/eshop.xml'
								className='form-pay'
								target='_blank'
								method='POST'
							>
								<input name='shopId' value='91439' type='hidden'/>
								<input name='scid' value='85330' type='hidden'/>
								<input name='customerNumber' value={shortid.generate()} type='hidden'/>
								<input name='sum' value={payment.amount} type='hidden'/>
								<input name='orderNumber' value={payment.txId} type='hidden'/>
								<input name='paymentType' value='' type='hidden'/>
								<div
									className='form-pay__submit'
								 	onClick={() => {
								 		this.yandex.submit()
								 	}}
								>
									<img
										className='ico-yandexkassa mt5'
									 	src='/assets/img/png/pay/yandexkassa.png'
									 	alt=''
									 />
								</div>

							</form>
						</li>
						<li className='options__item'>
							<form
								id='robokassaForm'
								action='https://auth.robokassa.ru/Merchant/Index.aspx'
								ref={(el) => this.robokassa = el}
								className='form-pay'
								target='_blank'
								method='POST'
							>
								<input type='hidden' name='MrchLogin' value='todayme'/>
								<input type='hidden' name='OutSum' value={payment.amount}/>
								<input type='hidden' name='Desc' value='Text description'/>
								<input
									type='hidden'
									name='SignatureValue'
									value={md5(`todayme:${payment.amount}:
									:OvBWnr3F02XOgu5VB9OH:shp_txid=${payment.txId}`)}
								/>
								<input type='hidden' name='shp_txid' value={payment.txId}/>
								<input type='hidden' name='Culture' value='ru'/>
								<div
									className='form-pay__submit'
									onClick={() => {this.robokassa.submit()}}
								>
								<img
									className='ico-robokassa mt20'
									src='/assets/img/png/pay/robokassa.png' alt=''
								/>
								</div>

							</form>
						</li>
					</ul>

					<ul className='entry-nav'>
						<li className='entry-nav__item'>
							<a href='#' onClick={e => {
								e.preventDefault()
								changeStep(Steps.two)
							}}>Вернуться на шаг назад</a>
						</li>
					</ul>

					<ul className='entry-nav'>
						<li className='entry-nav__item'>
							<a href='#' onClick={e => this.logOut(e)}>Выйти</a>
						</li>
					</ul>
				</div>
			)
		} else {
			return (
				<div className='entry__box'>
				<div className='entry-ico-box '>
					<img
						className='entry-ico-box__img'
						src='/assets/img/svg/ico-freebie.svg' alt=''
					/>
					<p className='entry-ico-box__title'>Халява!</p>
				</div>
					<Button
						onClick={() => this.payManual()}
						type={'button'}
						styleBtn={ButtonTypes.info}
						wide={true}
					>
						Продолжить
					</Button>
			</div>)
		}

	}

	logOut(e: any) {
		e.preventDefault()
		Cookie().remove('token', { path: '/' })
		Cookie().remove('abtest', { path: '/' })
		Cookie().remove('txId', { path: '/' })
		Cookie().remove('role', { path: '/' })
		Cookie().remove('program', { path: '/' })
		Cookie().remove('packageType', { path: '/' })
		Cookie().remove('promoName', { path: '/' })
		browserHistory.push('/')
		this.props.changeStep(Steps.one)

	}

	render() {
		const  {
			program,
			choosenProgram,
			payment,
			currentPackage,
		} = this.props

		if (this.props.isFetching) {
			return <Loader/>
		}
		return (
			<div>
				<div className={classNames('entry__header entry__header--colorful', {
					'g-hero': choosenProgram % 4 == 1,
					'g-mather': choosenProgram % 4 == 2,
					'g-extreme': choosenProgram % 4 == 3,
					'g-tomorrow': choosenProgram % 4 == 0,
				})}>
					<h2 className='entry__title text-center'>
						{program ? '#' + program.name : null }
					</h2>
				</div>
				{choosenProgram % 4 !== 0 && <p className='entry-packet-name'>{currentPackage.name}</p>}

				{<p className='entry-program-price highlight md30'>{payment.amount} руб.</p>}
				{ this.renderContent() }

			</div>)
	}
}

const StepThree = connect(mapStateToProps, {
	paymentInfo,
	paymentManual
})(StepThreeComponent)
export default StepThree
