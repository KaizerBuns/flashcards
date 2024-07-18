import { StyleSheet } from 'react-native';
import Colors from './Colors';

//add custom style sheets here i.e buttons
export const defaultStyleSheet = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomButton: {
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 40,
		width: 300,
		flex: 1,
		backgroundColor: Colors.primary,
		padding: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	buttonText: {
		color: '#fff',
	},
	input: {
		height: 40,
		borderWidth: 1,
		backgroundColor: '#fff',
		borderColor: Colors.darkGrey,
		borderRadius: 8,
		padding: 8,
		marginVertical: 4,
	},
	button: {
		backgroundColor: Colors.primary,
		padding: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ccc',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginVertical: 40,
		textAlign: 'center',
	},
});
