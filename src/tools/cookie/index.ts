import * as cookie from 'react-cookie'

interface CookieAction {
	save: (name: string, data: any, path?: object) => void
	load: (name: string) => any
	remove: (name: string, path?: object) => void
}

const Cookie = (): CookieAction => {
	const save = (name: string, data: any, path?: object): void => {
		cookie.save(name, data, path)
	}
	const load = (name: string): any => {
		return cookie.load(name)
	}
	const remove = (name: string, path?: object): any => {
		return cookie.remove(name, path)
	}
	return {
		save,
		load,
		remove
	}
}
export default Cookie