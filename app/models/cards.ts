import ApiService from '@/data/api';
import { getUser } from '@/models/user';

export interface Card {
	answer: string;
	id: string;
	question: string;
	image?: any;
	set: string;
}

export const createCard = async (card: Partial<Card>) => {
	const response = await ApiService().post(
		'/cards/create',
		JSON.stringify(card)
	);
	return response.data;
};

export const getLearnCards = async (setid: string, limit: string) => {
	const response = await ApiService().get(
		`/cards/learn?setId=${setid}&limit=${limit}`
	);
	return response.data;
};

export const getCardsForSet = async (setid: string) => {
	const response = await ApiService().get(`/cards?setId=${setid}`);
	return response.data;
};

export const addToFavorites = async (set: string) => {
	const user = await getUser();
	const response = await ApiService().post(
		'/usersets/create',
		JSON.stringify({ user, set })
	);
	return response.data;
};
