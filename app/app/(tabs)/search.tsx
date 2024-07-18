import { View, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getUser } from '@/models/user';
import { Set, getSets } from '@/models/set';
import { defaultStyleSheet } from '@/constants/Styles';
import { RenderSearchItem } from '@/components/RenderItems';

const Page = () => {
	//i'm setting sets as an array of Sets Objects
	const [sets, setSets] = useState<Set[]>([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [userId, setUserId] = useState('');

	useEffect(() => {
		loadSets();
		loadUser();
	}, []);

	const loadSets = async () => {
		const data = await getSets();
		setSets(data);
	};

	const loadUser = async () => {
		const userId = await getUser();
		setUserId(userId || '');
	};

	return (
		<View style={defaultStyleSheet.container}>
			<FlatList
				data={sets}
				renderItem={RenderSearchItem}
				refreshControl={
					<RefreshControl refreshing={isRefreshing} onRefresh={loadSets} />
				}
			/>
		</View>
	);
};

export default Page;
