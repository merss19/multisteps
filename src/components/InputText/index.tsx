import * as React from 'react'
import {WrappedFieldProps} from 'redux-form'
import * as classNames from 'classNames'

interface OwnProps extends WrappedFieldProps<{}> {
	placeholder: string
}

class InputText extends React.PureComponent<OwnProps, {}> {

	render() {
		const {input, placeholder, meta: {touched, error}} = this.props
		return (
			<div className={classNames('input', {'input--error': touched && !!error})}>
				<input
					className='input__field'
					{...input}
					type='text'
					placeholder={placeholder}
				/>
				{touched && error && <p className='input__alert'>{error}</p>}
			</div>
		)
	}
}
export default InputText