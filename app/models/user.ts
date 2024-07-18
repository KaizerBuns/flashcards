import AsyncStorage from '@react-native-async-storage/async-storage';
export const getUser = async () => {
	const user = await AsyncStorage.getItem('userid');
	return user;
};

export const setUser = async (user: string) => {
	return await AsyncStorage.setItem('userid', user);
};
