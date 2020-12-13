import slugify from 'slugify';

const slugGenerator = (name) => {
	if (!name) return;

	return slugify(name, {
		lower: true,
		strict: true,
	});
};

export default slugGenerator;
