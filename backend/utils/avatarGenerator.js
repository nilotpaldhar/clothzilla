import dotenv from 'dotenv';
dotenv.config();

// Checks if the value is string or not
const isString = (str) => {
	if (typeof str === 'string' || str instanceof String) {
		return true;
	} else {
		return false;
	}
};

// Generates url friendly name
const generateUrlFriendlyName = (name) => {
	if (!name || !isString(name)) return null;
	const nameArray = name.split(' ');
	return nameArray.join('+');
};

// Generate avatar based on name
const avatarGenerator = (name) => {
	const urlFriendlyName = generateUrlFriendlyName(name);
	return `${process.env.UI_AVATARS_URL}/?name=${urlFriendlyName}&uppercase=true&rounded=true&size=128`;
};

export default avatarGenerator;
