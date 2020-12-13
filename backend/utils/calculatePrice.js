export const calculateDisountedPrice = (listPrice = 0, discountRate = 0) => {
	listPrice = Number(listPrice);
	discountRate = Number(discountRate);
	return (listPrice - (listPrice * discountRate) / 100).toFixed(2);
};

export const calculateTaxPrice = (price = 0, taxRate = 0) => {
	price = Number(price);
	taxRate = Number(taxRate);
	return ((price * taxRate) / 100).toFixed(2);
};

export const calculateSalesPrice = (disountedPrice = 0, taxPrice = 0) => {
	disountedPrice = Number(disountedPrice);
	taxPrice = Number(taxPrice);
	return (disountedPrice + taxPrice).toFixed(2);
};
