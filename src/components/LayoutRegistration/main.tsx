import * as React from 'react'
import Background from '../Background'
import LogoLink from '../LogoLink'
import * as SVGInjector from 'svg-injector'
import {host} from '../../config'

interface Sprite {
	readonly body: any
	readonly img: HTMLImageElement
}

interface OwnProps {
	notLogo?: boolean
}
let url = process.env.NODE_ENV === 'test' ? host : '/'

class LayoutRegistration extends React.Component<OwnProps, {}> {

	componentDidMount() {
		this.svgInject()
	}

	svgInject(): void {
		const sprite: Sprite = {
			body: document.querySelector('body'),
			img : document.createElement('img')
		}
		sprite.img.className = 'injected-svg'
		sprite.img.id = 'svg-inject-me'
		sprite.img.src = url + 'src/assets/img/symbol-sprite.svg'
		sprite.body.appendChild(sprite.img)
		let mySVGsToInject: any = document.querySelector('#svg-inject-me')
		SVGInjector(mySVGsToInject)
	}

	renderLogo() {
		if (!this.props.notLogo) {
			return (
				<div className='grid entry-header'>
					<div className='grid__cell todayme-logo'>
						<LogoLink/>
					</div>
				</div>
			)
		}
		return null
	}

	render() {
		const {children} = this.props
		return (
			<div className='layout layout--entry'>
				{this.renderLogo()}
				{children}
				<Background />
			</div>
		)
	}
}

export default LayoutRegistration