interface CarrotAction {
	auth: (id: number, cqhmac: any) => void
}

const Carrot = (): CarrotAction => {
	const auth = (id: number, cqhmac: any): void => {
		window.carrotquest.auth(id, cqhmac)
	}

	return {
		auth
	}
}
export default Carrot