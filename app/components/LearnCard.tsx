import { Card } from '@/models/cards';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
	card: Card;
	isFront: boolean;
	textHidden?: boolean;
}

const LearnCard = ({ card, isFront, textHidden }: Props) => (
	<View style={styles.container}>
		{isFront && !textHidden && <Text style={styles.text}>{card.question}</Text>}
		{!isFront && <Text style={styles.text}>{card.answer}</Text>}
	</View>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: 300,
		height: 300,
		justifyContent: 'center',
		borderRadius: 10,
		padding: 20,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},

	text: {
		fontSize: 18,
		color: '#023047',
		alignSelf: 'center',
		marginTop: 20,
	},
});

export default LearnCard;
