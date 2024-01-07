import {useState , useEffect} from 'react'
import { useParams , Navigate } from 'react-router-dom'
import Editor from '../components/Editor'
const baseURL = import.meta.env.VITE_BASE_URL;

const EditPage = () => {
  const {id} = useParams()
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState("")
  const [redirect, setRedirect] = useState(false)


  useEffect(() => {
    fetch(`${baseURL}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      });
    });

  }, [id]);


  const updatePost = async(e) =>{
    e.preventDefault()
    const data = new FormData
    data.set("title",title)
    data.set("summary",summary)
    data.set("content",content)
    data.set("id",id)
    if (files?.[0]){
    data.set("file",files[0])
    }
  const response = await fetch(`${baseURL}/post/${id}`,{
    method:'PUT',
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
    <form onSubmit={updatePost}>
       <input type="text" name="title" value={title} placeholder='Title'
        onChange={(e) => setTitle(e.target.value)} />
      <input type="text" name="summary" value={summary} placeholder='summary'
        onChange={(e) => setSummary(e.target.value)} style={{ height: 100 }} />
      <input type="file" name="file"  id='file'
        onChange={(e) => setFiles(e.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button>Update</button>

    </form>
  )
}

export default EditPage