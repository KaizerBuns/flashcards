import { Stack } from 'expo-router';
import Colors from '../constants/Colors';
import React from 'react';
//fixes xata client transformImage
import 'react-native-url-polyfill/auto';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Layout = () => {
	const router = useRouter();

	const renderCloseButton = () => {
		return (
			<TouchableOpacity onPress={() => router.back()}>
				<Ionicons name='close-outline' size={24} color={'#fff'} />
			</TouchableOpacity>
		);
	};

	// removes the stack layer header using Stack.Screen
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.primary,
				},
				headerTintColor: '#ffff',
			}}
		>
			<Stack.Screen
				name='(tabs)'
				options={{ headerShown: false }}
			></Stack.Screen>

			<Stack.Screen
				name='(modals)/set/[id]'
				options={{
					presentation: 'modal',
					title: 'View Set',
					headerRight: renderCloseButton,
				}}
			></Stack.Screen>

			<Stack.Screen
				name='(modals)/set/create'
				options={{
					presentation: 'modal',
					title: 'Create Set',
					headerRight: renderCloseButton,
				}}
			></Stack.Screen>

			<Stack.Screen
				name='(modals)/(cards)/[id]'
				options={{
					presentation: 'modal',
					title: 'Update Card',
					headerLeft: renderCloseButton,
				}}
			></Stack.Screen>

			<Stack.Screen
				name='(learn)/[id]'
				options={{
					title: 'Learn Set',
				}}
			></Stack.Screen>
		</Stack>
	);
};

export default Layout;
