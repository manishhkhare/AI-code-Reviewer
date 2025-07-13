import { useState } from 'react'
import Editor from 'react-simple-code-editor'
import prism from 'prismjs'
import 'prismjs/components/prism-javascript'; // Import language
import 'prismjs/themes/prism.css';   
import './App.css'

function App() {
  const [response, setResponse] = useState();
  const [code,setCode] = useState(`// Try typing here!
const x = 42;
if (x > 10) {
  console.log('x is big');
} 
`)  
  const Handler = async () => { 
    try {
      

      const response =
        await fetch("https://code-reviewer-api-9xks.onrender.com/ai/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code })
      })
      let result = await response.text()
      console.log(result);
      setResponse(result)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(prism)
  return (
    <><div className='wrapper'>
      <div className='response'>
        <Editor value={code}
          onValueChange={(newCode) => setCode(newCode)}
          highlight={code=>prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={10} 
             style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 20,
            backgroundColor: '#1e1e1e',
            color: 'white',
            width: '100%',
            minHeight: '100%',
            borderRadius: "10px",
            padding:"10px"
            
          }}
        />
       <button className='editor-button' onClick={()=>Handler()}>Review</button>
      </div> 
        <div className='review'>
         {response}
     </div>
    </div>
   
    </>
  )
}

export default App
