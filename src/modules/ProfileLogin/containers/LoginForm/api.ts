import {apiData} from '../../../../tools/api'
import {AuthenticateFb} from '../../interfaces'

export const fetchAuthenticateFb = (data: AuthenticateFb): Promise<any> => {
	const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(data)
	}

	return fetch(apiData.authenticateSocial, options)

}