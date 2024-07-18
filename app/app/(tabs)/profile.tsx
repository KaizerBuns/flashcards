import {
	View,
	Text,
	ListRenderItem,
	FlatList,
	StyleSheet,
	RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Set } from '@/models/set';
import { getUserLearnings } from '@/models/learnings';
import Colors from '@/constants/Colors';
import { defaultStyleSheet } from '@/constants/Styles';
import { RenderMyProgressItem } from '@/components/RenderItems';

const Page = () => {
	const [sets, setSets] = useState<
		{
			set: Set;
			score: number;
			cards_correct: number;
			cards_wrong: number;
			id: string;
			xata: any;
		}[]
	>([]);
	const [isRefreshing, setIsRefreshing] = useState(false);

	useEffect(() => {
		loadProgress();
	}, []);

	const loadProgress = async () => {
		const data = await getUserLearnings();
		setSets(data);
	};

	return (
		<View style={defaultStyleSheet.container}>
			<Text style={defaultStyleSheet.header}>{sets.length} sessions</Text>
			<FlatList
				data={sets}
				renderItem={RenderMyProgressItem}
				refreshControl={
					<RefreshControl refreshing={isRefreshing} onRefresh={loadProgress} />
				}
			/>
		</View>
	);
};

export default Page;
