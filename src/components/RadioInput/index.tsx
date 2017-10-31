import * as React from 'react'
import {WrappedFieldProps} from 'redux-form'

interface OwnProps extends WrappedFieldProps<{}> {
	name: string
	id: string
	title: string
	setRadioError: (data: string) => void
	removeRadioError: () => void
}

class RadioInput extends React.Component<OwnProps, {}> {

	componentWillReceiveProps(nextProps: OwnProps) {
		const {setRadioError, removeRadioError} = this.props
		if (nextProps.meta.touched && nextProps.meta.error) {
			setRadioError(nextProps.meta.error)
		}

		if (nextProps.meta.touched && !nextProps.meta.error) {
			removeRadioError()
		}
	}

	render() {
		const {input, name, id, title} = this.props
		return (
			<span className='radio'>
				<label className='radio__label' htmlFor={id}>
					<input {...input} className='radio__field' id={id} type='radio' name={name}/>
					<span className='radio__ph'/>
					<span>{title}</span>
				</label>
			</span>
		)
	}
}
export default RadioInput