import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { format } from 'date-fns';

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});

function getCurrentDateTime() {
	const currentDateTime = format(new Date(), 'dd.MM.yyyy_HH:mm:ss');
	return currentDateTime;
};

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "ProfilePictures",
		public_id: (req, file) => `profile_picture_${getCurrentDateTime()}`,
	}
})

const upload = multer({ storage: storage })

export default upload