import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Card, createCard, getCardsForSet } from '@/models/cards';
import { deleteSet } from '@/models/set';
import { defaultStyleSheet } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [cards, setCards] = useState<Card[]>([]);
	const [info, setInfo] = useState({
		question: '',
		answer: '',
	});
	const router = useRouter();

	useEffect(() => {
		if (!id) {
			return;
		}
		const loadCards = async () => {
			const data = await getCardsForSet(id);
			setCards(data);
		};
		loadCards();
	}, [id]);

	const handleAddCard = async () => {
		const newCard = await createCard({ set: id, ...info });
		//add card to collection
		setCards([...cards, newCard]);
		//reset form
		setInfo({
			question: '',
			answer: '',
		});
	};

	const handleDeleteSet = async () => {
		deleteSet(id);
		router.back();
	};

	return (
		<View
			style={[
				defaultStyleSheet.container,
				{ marginTop: 20, marginHorizontal: 16 },
			]}
		>
			<Stack.Screen
				options={{
					headerRight: () => (
						<TouchableOpacity onPress={handleDeleteSet}>
							<Ionicons
								name='trash-outline'
								size={24}
								color={'#fff'}
							></Ionicons>
						</TouchableOpacity>
					),
				}}
			/>
			<View>
				<TextInput
					style={defaultStyleSheet.input}
					placeholder='Question?'
					value={info.question}
					onChangeText={(text) => setInfo({ ...info, question: text })}
				></TextInput>
				<TextInput
					style={defaultStyleSheet.input}
					placeholder='Answer'
					value={info.answer}
					onChangeText={(text) => setInfo({ ...info, answer: text })}
				></TextInput>
			</View>
			<TouchableOpacity
				style={defaultStyleSheet.button}
				onPress={handleAddCard}
			>
				<Text style={defaultStyleSheet.buttonText}>Add Card</Text>
			</TouchableOpacity>

			<View style={{ marginTop: 20 }}>
				{cards.map((card, index) => (
					<View key={card.id} style={styles.setRow}>
						<Text style={styles.rowQuestion}>
							{index + 1}. {card.question}
						</Text>
						<Text style={styles.rowAnswer}>{card.answer}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	setRow: {
		padding: 16,
		backgroundColor: '#fff',
		marginBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightGrey,
		borderRadius: 8,
	},
	rowQuestion: {
		fontSize: 16,
		fontWeight: '500',
	},
	rowAnswer: {
		color: Colors.darkGrey,
	},
});
