import {shallow} from 'enzyme'
import Background from './index'
import * as React from 'react'
import toJson from 'enzyme-to-json'

describe('Component Background', () => {
	const component = shallow(<Background/>)
	it('renders component', () => {
		expect(component).toHaveLength(1)
	})
	it('renders correctly', () => {
		const tree = toJson(shallow(<Background/>))
		expect(tree).toMatchSnapshot()
	})
})
