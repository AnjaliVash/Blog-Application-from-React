import jsonServer from '../api/jsonServer';
import createDataContext from './createDataContext';

const blogReducer =(state,action) =>{
	switch(action.type){
		case 'del_BlogPost':
			return state.filter(blogPost => blogPost.id !==action.payload);			
		
		case 'edit_BlogPost':
			return state.map(blogPost=>{

				return blogPost.id === action.payload.id ?
				 action.payload:blogPost;
			});

		case 'get_BlogPosts':
			return action.payload;
		
		default:
			return state;
	}
};

const getBlogPosts = dispatch =>{
	return async () =>{
		const response = await jsonServer.get('/blogposts');

		dispatch({ type:'get_BlogPosts', payload: response.data});
	};
};

const addBlogPost =(dispatch) => {
	return async (title,content,callback) =>{
		await jsonServer.post('/blogposts', { title, content});
		if(callback) {callback();}
	};
		
	}; 

const deleteBlogPost =(dispatch) => {
	return async (id) =>{
		await jsonServer.delete(`/blogposts/${id}`);
		dispatch({type: 'del_BlogPost', payload: id});
	};
	};  

const editBlogPost =(dispatch) => {
	return async (id, title,content,callback) =>{
		await jsonServer.put(`/blogposts/${id}`, { title, content});
		dispatch({type: 'edit_BlogPost', payload :{ id, title, content}});
	  
		if(callback) {callback();}
	};
	return (id, title,content,callback) =>{
	   dispatch({type: 'edit_BlogPost', payload :{ id, title, content}});
	   
	};	
	}; 


export const { Context, Provider }= createDataContext (
	blogReducer,{addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},[]
	);
