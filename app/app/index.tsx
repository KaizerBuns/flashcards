import { View, Text } from 'react-native';
import react, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { setUser, getUser } from '../models/user';

const Page = () => {
	const [hasId, setHasId] = useState(false);

	useEffect(() => {
		// if the user has an id, if not create it
		const loadId = async () => {
			var id = await getUser();
			if (!id) {
				id = Math.random().toString(36);
				await setUser(id);
			}
			setHasId(true);
		};

		loadId();
	}, []);

	if (hasId) {
		return <Redirect href='/(tabs)/sets'></Redirect>;
	} else {
		return <View />;
	}
};

export default Page;
