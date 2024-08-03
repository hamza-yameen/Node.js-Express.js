export const generateRandomNumber = () => {
	return Math.floor(10000 + Math.random() * 90000);
};

export const checkIsCodeValid = (createdAt) => {
	const currentTime = Date.now();
	const createdDate = new Date(createdAt);
	const timeDifference = currentTime - createdDate.getTime();
	const differenceInMinutes = timeDifference / (1000 * 60);
	return differenceInMinutes <= 60;
};
