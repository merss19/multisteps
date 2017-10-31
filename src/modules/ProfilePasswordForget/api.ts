import {apiData} from '../../tools/api'
import { PasswordFormData, RestoreFormData } from './interfaces'
import {host} from  '../../config'

export const submitDataPassword = (data: PasswordFormData): Promise<any> => {
	const payload = {
		url: `${host}/restore/create`,
		data
	}
	const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(payload)
	}

	return fetch(apiData.sendRestorePassword, options)

}
export const submitDataRestore = (data: RestoreFormData): Promise<any> => {
	const payload = {
		token: data.tokenPassword,
		password: data.pass
	}
	const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(payload)
	}

	return fetch(apiData.sendRestorePassword, options)

}
