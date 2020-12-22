// Checking if item is already added in the cart
export const existingCartItem = (cartItems = [], item = {}) => {
	return cartItems.find((cartItem) => cartItem.product === item.product);
};

export const addItem = (cartItems, itemToAdd) => {
	// Modifying product before adding to cart items
	const modifiedItem = {
		name: itemToAdd.name,
		slug: itemToAdd.slug,
		image: itemToAdd.image,
		stock: itemToAdd.stock,
		price: itemToAdd.salePrice || itemToAdd.price,
		tax: itemToAdd.taxPrice,
		product: itemToAdd._id || itemToAdd.product,
	};

	// If item exists then increase quantity else add to cart items
	if (existingCartItem(cartItems, modifiedItem)) {
		return cartItems.map((cartItem) =>
			cartItem.product === modifiedItem.product
				? {
						...cartItem,
						quantity: cartItem.quantity + 1,
						total: (cartItem.price * (cartItem.quantity + 1)).toFixed(2),
				  }
				: cartItem
		);
	}

	return [
		...cartItems,
		{ ...modifiedItem, quantity: 1, total: modifiedItem.price },
	];
};

export const removeItem = (cartItems, itemToRemove) => {
	const existsItem = existingCartItem(cartItems, itemToRemove);

	if (existsItem.quantity === 1) {
		return cartItems.filter(
			(cartItem) => cartItem.product !== itemToRemove.product
		);
	}

	return cartItems.map((cartItem) =>
		cartItem.product === itemToRemove.product
			? {
					...cartItem,
					quantity: cartItem.quantity - 1,
					total: (cartItem.price * (cartItem.quantity - 1)).toFixed(2),
			  }
			: cartItem
	);
};

export const clearItem = (cartItems, itemToRemove) => {
	return cartItems.filter(
		(cartItem) => cartItem.product !== itemToRemove.product
	);
};
