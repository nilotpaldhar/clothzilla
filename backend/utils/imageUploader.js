import cloudinary from '../config/cloudinary.js';

const imageUploader = async (file, folderName = 'general', width = 100) => {
	if (!file) return;
	const { eager } = await cloudinary.uploader.upload(file, {
		upload_preset: 'clothzilla',
		folder: `/clothzilla/${folderName}`,
		eager: [{ width, format: 'jpg' }],
	});
	return eager[0].secure_url;
};

export default imageUploader;
