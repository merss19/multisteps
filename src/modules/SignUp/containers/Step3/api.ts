import {apiData} from '../../../../tools/api'
import Cookie from '../../../../tools/cookie'

export const fetchPaymentInfo = (): Promise<any> => {
	const payload = {
		authToken: Cookie().load('token'),
		data: { take: 1 }
		}
	const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(payload)
	}

	return fetch(apiData.paymentGetInfo, options)

}

export const fetchPaymentManual = (txId: string): Promise<any> => {
	const payload = {
		authToken: Cookie().load('token'),
		data: { txId: txId }
	}
	const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(payload)
	}

	return fetch(apiData.paymentSetpaidManual, options)

}