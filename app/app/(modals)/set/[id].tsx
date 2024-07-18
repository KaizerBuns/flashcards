import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Set, getSet } from '@/models/set';
import { addToFavorites } from '@/models/cards';
import { defaultStyleSheet } from '@/constants/Styles';

const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [set, setSet] = useState<Set>();
	const router = useRouter();

	const loadSet = async () => {
		const data = await getSet(id);
		setSet(data);
	};

	const handleAddToFavorites = async () => {
		await addToFavorites(id);
		router.push('/(tabs)/sets');
	};

	useEffect(() => {
		loadSet();
	}, [id]);

	return (
		<View style={defaultStyleSheet.container}>
			{set && (
				<View
					style={{ alignItems: 'flex-start', padding: 16, gap: 10, flex: 1 }}
				>
					{set.image && (
						<Image
							source={{
								uri: set.image.url,
							}}
							style={{ width: '100%', height: 200, borderRadius: 8 }}
						></Image>
					)}
					<Text>{set.cards}</Text>
					<Text style={styles.header}>{set.title}</Text>
					<Text>{set.description}</Text>
					<Text style={{ color: '#666' }}>Created by: {set.creator}</Text>
				</View>
			)}
			<View
				style={{
					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					style={defaultStyleSheet.bottomButton}
					onPress={handleAddToFavorites}
				>
					<Text style={defaultStyleSheet.buttonText}>Add to Favorites</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});

export default Page;
