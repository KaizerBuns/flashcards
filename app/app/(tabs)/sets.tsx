import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MySet, getMySets } from '@/models/set';
import { defaultStyleSheet } from '@/constants/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { RenderMyItem } from '@/components/RenderItems';

const Page = () => {
	const [sets, setSets] = useState<MySet[]>([]);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const loadMySets = async () => {
		const data = await getMySets();
		setSets(data);
	};
	useEffect(() => {
		loadMySets();
	}, []);
	return (
		<View style={defaultStyleSheet.container}>
			{!sets.length && (
				<Link href={'/(tabs)/search'} asChild>
					<TouchableOpacity>
						<Text
							style={{ textAlign: 'center', padding: 20, color: '#3f3f3f' }}
						>
							Add your first set!
						</Text>
					</TouchableOpacity>
				</Link>
			)}
			<FlatList
				data={sets}
				renderItem={RenderMyItem}
				refreshControl={
					<RefreshControl refreshing={isRefreshing} onRefresh={loadMySets} />
				}
			/>
		</View>
	);
};

export default Page;
