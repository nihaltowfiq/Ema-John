import React from 'react';
import { Button, Container } from 'react-bootstrap';

const Inventory = () => {
	const handleAddProduct = () => {
		// fetch('https://mighty-reef-39398.herokuapp.com/addProducts', {
		//     method: 'POST',
		//     headers: {'Content-Type': 'application/json'},
		//     body: JSON.stringify(fakeData)
		// })
	};
	return (
		<Container>
			<Button onClick={handleAddProduct}>Add Produtcs</Button>
		</Container>
	);
};

export default Inventory;
