import React, {useContext,useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {Context} from '../context/BlogContext';

const CreateScreen =({navigation}) =>{
	
	const [title,setTitle] =useState("");
	const [content,setContent] = useState("");
	const {addBlogPost} = useContext(Context);

	return(
		<View>
			<Text style={styles.label}>Enter Title: </Text>
			<TextInput value={title} 
					onChangeText={(text) => setTitle(text)} 
					style={styles.input} 
					/>
			<Text style={styles.label}>Enter Content: </Text>
			<TextInput value={content} 
					onChangeText={(text) => setContent(text)} 
					style={styles.input} 
					/>
			<Button title="Add Blog Post" 
			onPress= {()=>{addBlogPost(title,content,()=>{navigation.navigate('Index');
				});
				}}/>
		</View>
		); 
};

const styles =StyleSheet.create({

	input:
	{
		fontSize: 20,
		borderWidth: 1,
		borderColor:'black',
		marginBottom:5,
		padding:5,
		margin:5
	},
	label:
	{
		fontSize: 20,
		marginBottom:5,
		marginLeft:5
	}
});

export default CreateScreen;





import createDataContext from './createDataContext';

const blogReducer =(state,action) =>{
	switch(action.type){
		case 'add_BlogPost':
			return [...state,{id: Math.floor(Math.random()*99999), title: action.payload.title, content: action.payload.content}];
		case 'del_BlogPost':
			return state.filter(blogPost => blogPost.id !==action.payload);			
		
		case 'edit_BlogPost':
			return state.map(blogPost=>{

				return blogPost.id === action.payload.id ?
				 action.payload:blogPost;
			});
		
		default:
			return state;
	}
};

const addBlogPost =(dispatch) => {
	return (title,content,callback) =>{
	   dispatch({type: 'add_BlogPost', payload :{ title, content}});
	if(callback) {callback();}
	};	
	}; 

const deleteBlogPost =(dispatch) => {
	return (id) =>{
	   dispatch({type: 'del_BlogPost', payload: id});
	};
	}; 

const editBlogPost =(dispatch) => {
	return (id, title,content,callback) =>{
	   dispatch({type: 'edit_BlogPost', payload :{ id, title, content}});
		if(callback) {callback();}
	};	
	}; 


export const { Context, Provider }= createDataContext (
	blogReducer,{addBlogPost, deleteBlogPos, editBlogPost},[{title: 'TEST Post', content: 'Test Content', id: 1}]
	);







{/*

try{
		await axios.post('alskdjf',title,content)

		catch(e){
		<View><Text>Well there is some problem dude!</Text></View>
	}

export const BlogProvider =({children})=> {
	const [blogPosts,setBlogPosts]=useState([]);
	const [blogPosts,dispatch] = useReducer(blogReducer,[])

	

	const addBlogPost =() => {
			setBlogPosts([...blogPosts,{title: `Blog Post #${blogPosts.length+1}`}]);
		}; episode 11 chapter 12
		
	const try ing =[
	{title: 'Blog Post #1'},
	{title: 'Blog Post #2'}
	];

	return <BlogContext.Provider value={{data:blogPosts, addBlogPost}}>
	{children} 
	</BlogContext.Provider>
}
export default BlogContext;
*/} 


import jsonServer from '../api/jsonServer';
import createDataContext from './createDataContext';

const blogReducer =(state,action) =>{
	switch(action.type){
		case 'add_BlogPost':
			return [...state,{id: Math.floor(Math.random()*99999), title: action.payload.title, content: action.payload.content}];
		case 'del_BlogPost':
			return state.filter(blogPost => blogPost.id !==action.payload);			
		
		case 'edit_BlogPost':
			return state.map(blogPost=>{

				return blogPost.id === action.payload.id ?
				 action.payload:blogPost;
			});

		case 'get_BlogPosts':
			return [action.payload];
		
		default:
			return state;
	}
};

const getBlogPosts = dispatch =>{
	return async () =>{
		const response = await jsonServer.get('/blogPosts');

		dispatch({ type:'get_BlogPosts', payload: response.data})
	};
};

const addBlogPost =(dispatch) => {
	return (title,content,callback) =>{
	   dispatch({type: 'add_BlogPost', payload :{ title, content}});
	if(callback) {callback();}
	};	
	}; 

const deleteBlogPost =(dispatch) => {
	return (id) =>{
	   dispatch({type: 'del_BlogPost', payload: id});
	};
	}; 

const editBlogPost =(dispatch) => {
	return (id, title,content,callback) =>{
	   dispatch({type: 'edit_BlogPost', payload :{ id, title, content}});
		if(callback) {callback();}
	};	
	}; 


export const { Context, Provider }= createDataContext (
	blogReducer,{addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},[]
	);














