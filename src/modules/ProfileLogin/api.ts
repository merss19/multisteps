import {apiData} from '../../tools/api'
import {LoginFormData} from './interfaces'

export const submitData = (data: LoginFormData): Promise<any> => {
	const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(data)
	}

	return fetch(apiData.authenticate, options)

}