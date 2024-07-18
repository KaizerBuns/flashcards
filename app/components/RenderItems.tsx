import {
	View,
	Text,
	StyleSheet,
	ListRenderItem,
	TouchableOpacity,
	Image,
} from 'react-native';
import React from 'react';
import { Set, MySet } from '@/models/set';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { transformImage } from '@xata.io/client';

export const RenderSearchItem: ListRenderItem<Set> = ({ item }) => {
	return (
		<Link href={`/(modals)/set/${item.id}`} asChild>
			<TouchableOpacity style={styles.setRow}>
				<View style={{ flexDirection: 'row', gap: 10 }}>
					{item.image && (
						<Image
							source={{
								uri: transformImage(item.image.url, {
									width: 100,
									height: 100,
								}),
							}}
							style={{ width: 50, height: 50, borderRadius: 8 }}
						></Image>
					)}
					{!item.image && <View style={{ width: 50, height: 50 }}></View>}
					<View style={{ flex: 1 }}>
						<Text style={styles.rowTitle}>{item.title}</Text>
						<Text style={styles.rowCard}>{item.cards}</Text>
					</View>
					<Ionicons name='chevron-forward-outline' size={24}></Ionicons>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export const RenderMyItem: ListRenderItem<MySet> = ({ item }) => {
	return (
		<View style={{ ...styles.setRow, flexDirection: 'row', gap: 10 }}>
			{item.set.image && (
				<Image
					source={{
						uri: transformImage(item.set.image.url, {
							width: 100,
							height: 100,
						}),
					}}
					style={{ width: 50, height: 50, borderRadius: 8 }}
				></Image>
			)}
			{!item.set.image && <View style={{ width: 50, height: 50 }}></View>}
			<View style={{ flex: 1 }}>
				<Text style={styles.rowTitle}>{item.set.title}</Text>
				<Text style={styles.rowCard}>{item.set.cards}</Text>
				<Text style={styles.rowCard}>{item.canEdit}</Text>
			</View>
			<View>
				<Link href={`/(learn)/${item.set.id}`} asChild>
					<TouchableOpacity>
						<Ionicons name='school-outline' size={24}></Ionicons>
					</TouchableOpacity>
				</Link>
			</View>
			<View>
				{item.canEdit && (
					<Link href={`/(modals)/(cards)/${item.set.id}`} asChild>
						<TouchableOpacity>
							<Ionicons name='create-outline' size={24}></Ionicons>
						</TouchableOpacity>
					</Link>
				)}
			</View>
		</View>
	);
};

export const RenderMyProgressItem: ListRenderItem<{
	set: Set;
	score: number;
	cards_correct: number;
	cards_wrong: number;
	xata: any;
}> = ({ item }) => {
	return (
		<View style={styles.setRow}>
			<View style={{ flexDirection: 'row', gap: 10 }}>
				{item.set.image && (
					<Image
						source={{
							uri: transformImage(item.set.image.url, {
								width: 100,
								height: 100,
							}),
						}}
						style={{ width: 50, height: 50, borderRadius: 8 }}
					></Image>
				)}
				{!item.set.image && <View style={{ width: 50, height: 50 }}></View>}
				<View style={{ flex: 1 }}>
					<Text style={styles.rowTitle}>{item.set.title}</Text>
					<Text style={{ color: Colors.darkGrey }}>
						Score: {item.score.toFixed(2)},{' '}
						{item.xata.createdAt.substring(0, 10)}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	setRow: {
		padding: 16,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightGrey,
	},
	rowTitle: {
		fontSize: 16,
		fontWeight: '500',
	},
	rowCard: {
		color: Colors.darkGrey,
	},
});
