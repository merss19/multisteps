import {shallow, mount} from 'enzyme'
import LayoutRegistration from './main'
import * as React from 'react'
import toJson from 'enzyme-to-json'
import Background from '../Background'
import LogoLink from '../LogoLink'
import * as sinon from 'sinon'

process.env.NODE_ENV = 'test'

describe('Component LayoutRegistration', () => {
	const component = shallow(<LayoutRegistration/>)
	it('renders component', () => {
		expect(component).toHaveLength(1)
	})
	it('renders correctly', () => {
		const tree = toJson(shallow(<LayoutRegistration/>))
		expect(tree).toMatchSnapshot()
	})
	it('renders the LogoLink', () => {
		expect(component.find(LogoLink).exists()).toBe(true)
	})
	it('renders the Background', () => {
		expect(component.find(Background).exists()).toBe(true)
	})
})
describe('Component LayoutRegistration DOM', () => {
	const component = mount(<LayoutRegistration>
		<div>test</div>
	</LayoutRegistration>)
	it('children component defined', () => {
		expect(component.props().children).toBeDefined()
	})
	it('do not render logo', () => {
		const component = mount(<LayoutRegistration notLogo={true} />)
		//console.log(component.debug())
		expect(component.find(LogoLink).exists()).toBe(false)
	})
	it('calls componentDidMount', () => {
		const spy = sinon.spy(LayoutRegistration.prototype, 'componentDidMount')
		//const wrapper = mount(<LayoutRegistration />)
		expect(spy.calledOnce).toEqual(true)
	})
	it('calls svjInject', () => {
		const spy = sinon.spy(LayoutRegistration.prototype, 'svgInject')
		//const wrapper = mount(<LayoutRegistration />)
		expect(spy.calledOnce).toEqual(true)
	})
})