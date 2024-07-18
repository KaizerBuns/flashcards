import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { Card, getLearnCards } from '@/models/cards';
import { defaultStyleSheet } from '@/constants/Styles';
import LearnCard from '@/components/LearnCard';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { saveLearning } from '@/models/learnings';

const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [cards, setCards] = useState<Card[]>([]);
	const [currentCard, setCurrentCard] = useState(0);
	const [showFront, setShowFront] = useState(true);
	const [textHidden, setTextHidden] = useState(false);
	const [correctCards, setCorrectCards] = useState(0);
	const [wrongCards, setWrongCards] = useState(0);
	const [showResults, setShowResults] = useState(false);
	const rotate = useSharedValue(0);

	const frontAnimatedStyles = useAnimatedStyle(() => {
		const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
		return {
			transform: [
				{
					rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
				},
			],
		};
	});

	const backAnimatedStyles = useAnimatedStyle(() => {
		const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
		return {
			transform: [
				{
					rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
				},
			],
		};
	});

	useEffect(() => {
		if (!id) {
			return;
		}
		const loadCards = async () => {
			const data = await getLearnCards(id, '10');
			setCards(data);
		};
		loadCards();
	}, []);

	const onShowAnswer = () => {
		rotate.value = 1;
		setShowFront(false);
	};

	const onNextCard = async (correct: boolean) => {
		if (currentCard < cards.length - 1) {
			correct
				? setCorrectCards(correctCards + 1)
				: setWrongCards(wrongCards + 1);

			rotate.value = 0;
			setTextHidden(true);
			setTimeout(() => {
				setCurrentCard(currentCard + 1);
				setTextHidden(false);
			}, 400);
		} else {
			setShowResults(true);
			const correctResult = correctCards + (correct ? 1 : 0);
			const wrongResult = wrongCards + (correct ? 0 : 1);
			saveLearning(id, cards.length, correctResult, wrongResult);
			setCorrectCards(correctResult);
			setWrongCards(wrongResult);
		}
		setShowFront(true);
	};

	return (
		<View style={defaultStyleSheet.container}>
			{showResults && (
				<View style={styles.container}>
					<Text style={styles.resultText}>
						{correctCards} correct, {wrongCards} wrong
					</Text>
					<Link href={'/(tabs)/sets'} asChild>
						<TouchableOpacity style={defaultStyleSheet.bottomButton}>
							<Text style={defaultStyleSheet.buttonText}>End session</Text>
						</TouchableOpacity>
					</Link>
				</View>
			)}

			{!showResults && cards.length > 0 && (
				<>
					<Text style={defaultStyleSheet.header}>
						{currentCard + 1} / {cards.length}
					</Text>
					<View style={styles.container}>
						<Animated.View style={[styles.frontCard, frontAnimatedStyles]}>
							<LearnCard
								card={cards[currentCard]}
								isFront={true}
								textHidden={textHidden}
							></LearnCard>
						</Animated.View>
						<Animated.View style={[styles.backCard, backAnimatedStyles]}>
							<LearnCard
								card={cards[currentCard]}
								isFront={false}
								textHidden={textHidden}
							></LearnCard>
						</Animated.View>
						{showFront && (
							<TouchableOpacity
								style={defaultStyleSheet.bottomButton}
								onPress={onShowAnswer}
							>
								<Text style={defaultStyleSheet.buttonText}>Show Answer</Text>
							</TouchableOpacity>
						)}
						{!showFront && (
							<View style={styles.bottomView}>
								<TouchableOpacity
									style={defaultStyleSheet.button}
									onPress={() => onNextCard(true)}
								>
									<Text style={defaultStyleSheet.buttonText}>Correct</Text>
									<Ionicons
										name='checkmark-outline'
										size={20}
										color='#fff'
									></Ionicons>
								</TouchableOpacity>
								<TouchableOpacity
									style={defaultStyleSheet.button}
									onPress={() => onNextCard(false)}
								>
									<Text style={defaultStyleSheet.buttonText}>Wrong</Text>
									<Ionicons
										name='close-outline'
										size={20}
										color='#fff'
									></Ionicons>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 30,
	},
	frontCard: {
		position: 'absolute',
		backfaceVisibility: 'hidden',
	},
	backCard: {
		backfaceVisibility: 'hidden',
	},
	bottomView: {
		position: 'absolute',
		bottom: 40,
		width: 300,
		flex: 1,
	},
	resultText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
});

export default Page;
