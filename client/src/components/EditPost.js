import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../js/action/postAction";
import {useParams} from "react-router-dom";
import {getPost} from "../js/action/postAction"
import axios from "axios";



const EditPost = ({match, history}) => {

	

	const post = useSelector(state => state.postReducer.posts)
  console.log("posts", post)

	const postId = match.params.postId;
	console.log(postId)

	const [desc, setDesc] = useState("")
	console.log("desc", desc)
	const [userId, setUserId] = useState(0) 
	console.log("userId", userId)
	const [id, setId] = useState(0)
	console.log("id", id)
	
	

	const dispatch = useDispatch()

	
	
	
	useEffect(() => {
		dispatch(getPost(postId));
		    setDesc(post.desc);
			setUserId(post.userId);
			setId(post._id);
	}, [])




	

    const editPost = ()=>{
        dispatch(updatePost(id, {userId, desc}))
    }
    

    return (
		<Fragment>
			
			<div className='container my-3'>
				<div className='row'>
					<div className='col-md-8 mx-auto'>
						<Link to='/'>
							<span className='fas fa-arrow-left'>Go Back</span>
						</Link>
						<div>
							<br />
							<div className='modal-content'>
								<form >
									<div className='modal-header bg-warning text-white'>
										<h5 className='modal-title'>
											Update Post
										</h5>
									</div>
									<div className='modal-body my-2'>
										<Fragment>
											<label className='btn btn-dark mr-4'>
												Choose file
												<input
													type='file'
													name='productImage'
													accept='images/*'
													hidden
													// onChange={handleImageUpload}
												/>
											</label>
											

											
											<div className='form-group'>
												<label className='text-secondary'>
													Description
												</label>
												<textarea
													className='form-control'
													rows='3'
													placeholder="Write your post" value={desc} onChange={(e)=>setDesc(e.target.value)}
													
												></textarea>
											</div>
											
											<div className='form-row'>
												
												
											</div>
										</Fragment>
									</div>
									<div className='modal-footer'>
										<button
											type='submit'
                                            className='btn btn-warning text-white'
                                            onClick={editPost}
										>
											Submit Post
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);

}

export default EditPost

