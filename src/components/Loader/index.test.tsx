import {shallow} from 'enzyme'
import {Loader} from './index'
import * as React from 'react'
import toJson from 'enzyme-to-json'

let props = {
	text: 'Подождите',
}

describe('Component Loader', () => {
	const component = shallow(<Loader {...props}/>)
	it('renders component', () => {
		expect(component).toHaveLength(1)
	})
	it('renders correctly', () => {
		const tree = toJson(shallow(<Loader {...props}/>))
		expect(tree).toMatchSnapshot()
	})
	it('render text', () => {
		expect(component.find('h2').text()).toEqual('Подождите')
	})
})
