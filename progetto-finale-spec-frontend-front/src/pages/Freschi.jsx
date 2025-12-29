import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function Freschi() {
	const { prodotti } = useContext(GlobalContext);


	console.log("prodotti", prodotti);


	return (
		<>
			<div>
				Freschi
			</div>
		</>
	)
}