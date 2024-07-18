import ApiService from '@/data/api';
import { getUser } from '@/models/user';

export const saveLearning = async (
	setid: string,
	cardsTotal: number,
	correct: number,
	wrong: number
) => {
	const user = await getUser();
	const response = await ApiService().post(
		'/learnings/create',
		JSON.stringify({ user, set: setid, cardsTotal, correct, wrong })
	);
	return response.data;
};

export const getUserLearnings = async () => {
	const user = await getUser();
	const response = await ApiService().get(`/learnings?user=${user}`);
	return response.data;
};
