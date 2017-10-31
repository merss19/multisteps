import {shallow} from 'enzyme'
import LogoLink from './index'
import * as React from 'react'
import toJson from 'enzyme-to-json'


describe('Component Loader', () => {
	const component = shallow(<LogoLink />)
	it('renders component', () => {
		expect(component).toHaveLength(1)
	})
	it('renders correctly', () => {
		const tree = toJson(shallow(<LogoLink />))
		expect(tree).toMatchSnapshot()
	})
})

describe('Component Loader DOM', () => {
	//const component = mount(<LogoLink />)
})
