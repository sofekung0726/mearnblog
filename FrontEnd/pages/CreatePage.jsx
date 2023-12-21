import { useState } from 'react'
import Editor from '../components/Editor'
const baseURL = import.meta.env.VITE_BASE_URL;
import { Navigate } from 'react-router-dom';
const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState("")
  const [redirect, setRedirect] = useState(false)
  
  const createPost = async (e) => {
    const data = new FormData
    data.set("title",title)
    data.set("summary",summary)
    data.set("file",files[0])
    data.set("content",content)
    e.preventDefault();
    const response = await fetch(`${baseURL}/post`,{
      method:'POST',
      body:data,
      credentials:"include",
    })
    if(response.ok){
      setRedirect(true);

    }
  }
  if(redirect){
    return <Navigate to={"/"}/>
  }
  return (
    <form onSubmit={createPost}>
      <input type="text" name="title" value={title} placeholder='Title'
        onChange={(e) => setTitle(e.target.value)} />
      <input type="text" name="summary" value={summary} placeholder='summary'
        onChange={(e) => setSummary(e.target.value)} style={{ height: 100 }} />
      <input type="file" name="file"  id='file'
        onChange={(e) => setFiles(e.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button>Create Post</button>

    </form>
  )
}

export default CreatePage   