import {useEffect, useState} from 'react'
import Post from '../components/Post'
const baseURL = import.meta.env.VITE_BASE_URL;

const IndexPage = () => {
  const [posts , getPosts] = useState([])
useEffect(()=>{
  fetch(`${baseURL}/post`).then((response=>{
    response.json().then((posts)=>{
      getPosts(posts)
    })
   
  }))
},[]) // in [] will be render component first time   
 
  return (
    <>
    {
      posts.length > 0 &&
      posts.map((post)=>{
        return <Post key={post._id} {...post}/>
      })
    }
    </>
  )
}

export default IndexPage