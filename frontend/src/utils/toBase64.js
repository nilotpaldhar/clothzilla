// Converts file to base64 encoded string
const toBase64 = (file) => {
	if (!file) return;
	// Converting file to base64
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};

export default toBase64;
