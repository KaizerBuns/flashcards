import ApiService from '@/data/api';
import { getUser } from './user';

export interface Set {
	cards: number;
	description: string;
	creator: string;
	id: string;
	title: string;
	image?: any;
}

export interface MySet {
	id: string;
	set: Set;
	canEdit: boolean;
}

export const createSet = async (set: Partial<Set>) => {
	const user = await getUser();
	const response = await ApiService().post(
		'/sets/create',
		JSON.stringify({ ...set, creator: user })
	);
	return response.data;
};

export const getSets = async (): Promise<Set[]> => {
	const response = await ApiService().get('/sets');
	return response.data;
};

export const deleteSet = async (setid: string) => {
	const response = await ApiService().delete(`/sets/${setid}`);
	return response.data;
};

export const getMySets = async (): Promise<MySet[]> => {
	const user = await getUser();
	const response = await ApiService().get(`/usersets?user=${user}`);
	return response.data.map((item: any) => ({
		...item,
		canEdit: item.set.creator === user,
	}));
};

export const getSet = async (id: string): Promise<Set> => {
	const response = await ApiService().get(`/sets/${id}`);
	return response.data;
};
