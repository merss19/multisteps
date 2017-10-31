import {shallow} from 'enzyme'
import InputText from './index'
import * as React from 'react'
import toJson from 'enzyme-to-json'

let touched = false
let props = {
	placeholder: 'Ваш email',
	meta: {
		touched: touched,
		error: 'Email должен быть заполнен',
		asyncValidating: false,
		autofilled: false,
		invalid: false,
		pristine: false,
		dirty: false,
		dispatch: (fn: any) => fn,
		valid: false
	},

}

describe('Component InputText', () => {
	const component = shallow(<InputText {...props}/>)
	it('renders component', () => {
		expect(component).toHaveLength(1)
	})
	it('renders correctly', () => {
		const tree = toJson(shallow(<InputText {...props}/>))
		expect(tree).toMatchSnapshot()
	})
	it('render placeholder', () => {
		expect(component.find('.input__field').prop('placeholder')).toEqual('Ваш email')
	})
	it('render input', () => {
		const component = shallow(<InputText {...props}/>)
		expect(component.find('.input__field').exists()).toBe(true)
	})
	describe('Render error', () => {
		beforeEach(() => {
			props.meta.touched = true
		})
		it('render error', () => {
			const component = shallow(<InputText {...props}/>)
			expect(component.find('.input__alert').exists()).toBe(true)
		})
		it('render error text', () => {
			const component = shallow(<InputText {...props}/>)
			expect(component.find('.input__alert').text()).toEqual('Email должен быть заполнен')
		})
		it('render error class', () => {
			const component = shallow(<InputText {...props}/>)
			expect(component.find('.input--error').exists()).toBe(true)
		})
	})
	describe('do not Render error', () => {
		beforeEach(() => {
			props.meta.touched = true
			props.meta.error = ''
		})
		it('do not render error', () => {
			const component = shallow(<InputText {...props}/>)
			expect(component.find('.input__alert').exists()).toBe(false)
		})
		it('do not render error class', () => {
			const component = shallow(<InputText {...props}/>)
			expect(component.find('.input--error').exists()).toBe(false)
		})
	})
})
