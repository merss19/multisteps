import * as React from 'react'
import {WrappedFieldProps} from 'redux-form'
import {Link} from 'react-router'

interface OwnProps extends WrappedFieldProps<{}> {
	name: string
	id: string
	title: string
	isTest?: any
}

class CheckboxInput extends React.Component<OwnProps, {}> {

	static defaultProps = {
		checked: false,
		isTest: false
	}

	componentWillMount() {
		const { input, isTest} = this.props
		if (isTest) {
			const  checkbox: any  = isTest
			if (input) {
				input.onChange(checkbox)
			}
		}
	}

	render() {
		const {input, title, id, meta: {touched, error}} = this.props
		const  value = input ? input.value : false
		return (
			<div className='checkboxes__item'>
				<span className='checkbox'>
					<label className='checkbox__label' htmlFor={id}>
						<input
							{...input}
							className='checkbox__field'
							checked={value}
							id={id}
							type='checkbox'
						/>
						<span className='checkbox__ph'>
						<svg className='svg ico-tick'>
							<use xlinkHref='#ico-tick' />
						</svg>
				 </span>
					<div className='checkbox__group'>
						<span className='checkbox__title'>{title}</span>
							<Link
								target='_blank'
								className='checkbox__link'
								to='http://todayme.ru/dogovor-oferty#.WGFQqrZ95E4'
							>
								оферты
							</Link>
							<span className='checkbox__divider'>и</span>
							<Link
								target='_blank'
								className='checkbox__link'
								to='https://todayme.ru/rules.pdf'
							>
								правил
							</Link>
					</div>
				</label>
				</span>
				{touched && error && <span className='checkbox__error'>{error}</span>}
			</div>

		)
	}
}
export default CheckboxInput