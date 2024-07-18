import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Switch,
	Image,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { createSet } from '@/models/set';
import { addToFavorites } from '@/models/cards';
import { defaultStyleSheet } from '@/constants/Styles';
import * as ImagePicker from 'expo-image-picker';

const Page = () => {
	const router = useRouter();
	const [info, setInfo] = useState({
		title: '',
		description: '',
		private: true,
		image: null as any,
	});

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			base64: true,
			aspect: [4, 3],
			quality: 0.5,
		});

		if (!result.canceled) {
			setInfo({ ...info, image: result.assets[0].base64 });
		}
	};

	const handleCreateSet = async () => {
		const data = await createSet(info);
		await addToFavorites(data.id);
		router.back();
	};

	return (
		<>
			<View
				style={[
					defaultStyleSheet.container,
					{ marginTop: 10, marginHorizontal: 16 },
				]}
			>
				<TextInput
					style={defaultStyleSheet.input}
					placeholder='Title'
					value={info.title}
					onChangeText={(text) => setInfo({ ...info, title: text })}
				></TextInput>
				<TextInput
					style={defaultStyleSheet.input}
					placeholder='Description'
					value={info.description}
					onChangeText={(text) => setInfo({ ...info, description: text })}
				></TextInput>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: 10,
						marginVertical: 10,
					}}
				>
					<Switch
						value={info.private}
						onValueChange={(value) => setInfo({ ...info, private: value })}
					/>
					<Text>Private</Text>
				</View>
				<TouchableOpacity style={defaultStyleSheet.button} onPress={pickImage}>
					<Text style={defaultStyleSheet.buttonText}>Select Image</Text>
				</TouchableOpacity>

				{info.image && (
					<Image
						source={{ uri: `data:image/jpeg;base64,${info.image}` }}
						style={{
							width: '100%',
							height: 200,
							marginTop: 16,
							borderRadius: 8,
						}}
					/>
				)}
			</View>
			<View style={{ alignItems: 'center' }}>
				<TouchableOpacity
					onPress={handleCreateSet}
					style={defaultStyleSheet.bottomButton}
				>
					<Text style={defaultStyleSheet.buttonText}>Create Set</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default Page;
