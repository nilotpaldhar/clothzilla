import bcrypt from 'bcryptjs';
const generatePassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const password = await generatePassword('red1234');

const users = [
	{
		name: 'Master User',
		email: 'admin@example.com',
		password,
		isAdmin: true,
	},
	{
		name: 'John Doe',
		email: 'john@example.com',
		password,
	},
	{
		name: 'Jane Doe',
		email: 'jane@example.com',
		password,
	},
	{
		name: 'Steave Smith',
		email: 'steve@example.com',
		password,
	},
	{
		name: 'Jeff',
		email: 'jeff@example.com',
		password,
	},
];

export default users;
