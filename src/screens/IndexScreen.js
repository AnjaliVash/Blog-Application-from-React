import React, {useContext, useEffect} from 'react';
import {Context} from '../context/BlogContext';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const IndexScreen =({navigation}) =>{
	const {state, deleteBlogPost, getBlogPosts}=useContext(Context);

	useEffect(() => {
		getBlogPosts();


		const listener= navigation.addListener('didFocus', ()=> {
			getBlogPosts();
		});

		return () =>{
			listener.remove();
		};

	}, [])

	return(
		<View>
			<Text style ={{fontSize: 20}}>Index Screen </Text>
			<FlatList
			data={state}
			keyExtractor ={(value)=> value.title}
			renderItem ={({item})=>{
				return (
				<TouchableOpacity onPress ={()=> navigation.navigate('Show', {id: item.id,title: item.title, content: item.content})}>
				<View style={styles.row}>
				<Text style={styles.title}>{item.title} - {item.id} </Text>
				<TouchableOpacity onPress ={() =>deleteBlogPost(item.id)}><Feather style={styles.icon} name="trash" />
				</TouchableOpacity>
				</View>
				</TouchableOpacity>
				);

			}}
			/>
		</View>
		); 
};

IndexScreen.navigationOptions =({navigation}) =>{
	return{
		headerRight:()=> <TouchableOpacity onPress ={()=>navigation.navigate('Create')}>
		<Feather name="plus" size={30}/>
		 </TouchableOpacity>
	};
};

const styles =StyleSheet.create({
	row:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical:15,
		paddingHorizontal:10,
		borderTopWidth: 1,
		borderColor: 'gray'
	},
	title:{
		fontSize:18
	},
	icon:{
		fontSize:22
	}
});

export default IndexScreen; 