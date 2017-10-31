import {apiData} from '../../tools/api'
import {SignUpFormData} from './interfaces'

export const fetchProgramsData = (): Promise<any> => {
	const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({})
	}

	return fetch(apiData.programGet, options)

}

export const fetchUserCreate = (data: SignUpFormData): Promise<any> => {
	const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(data)
	}

	return fetch(apiData.userCreate, options)

}