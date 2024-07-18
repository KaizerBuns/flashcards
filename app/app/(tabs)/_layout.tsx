import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import { Tabs, Link } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const Layout = () => {
	const showIcon = (title: String, iconName: String): Record<string, any> => {
		let defaultIcons = {
			title: title,
			tabBarIcon: ({ size, color }) => (
				<Ionicons name={iconName} size={size} color={color} />
			),
		};

		//on tab bar my sets add a + icon to the right of the title
		if (title === 'My Sets') {
			return {
				...defaultIcons,
				headerRight: () => (
					<Link href='/(modals)/set/create' asChild>
						<TouchableOpacity style={{ marginRight: 10 }}>
							<Ionicons name='add-outline' size={26} color={'#fff'} />
						</TouchableOpacity>
					</Link>
				),
			};
		} else {
			return defaultIcons;
		}
	};

	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.primary,
				},
				headerTintColor: '#ffff',
				tabBarActiveTintColor: Colors.primary,
			}}
		>
			<Tabs.Screen
				name='sets'
				options={showIcon('My Sets', 'home-outline')}
			></Tabs.Screen>
			<Tabs.Screen
				name='search'
				options={showIcon('Search', 'search-outline')}
			></Tabs.Screen>
			<Tabs.Screen
				name='profile'
				options={showIcon('Profile', 'person-outline')}
			></Tabs.Screen>
		</Tabs>
	);
};

export default Layout;
