import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // Import language
import 'prismjs/themes/prism.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './App.css';

function App() {
  const [response, setResponse] = useState();
  const [code, setCode] = useState(`// Try typing here!
const x = 42;
if (x > 10) {
  console.log('x is big');
}
`);

  const Handler = async () => {
    try {
      const response = await fetch("http://localhost:5001/ai/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const result = await response.text();
      console.log(result);
      setResponse(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="response">
          <div className='heading' style={{
            textAlign: "center",
            color: "#ffff",
            width: "100%",
            borderBottom:"2px solid #FFF"
            
          }}>
            <h3>Code here</h3>
          </div>
          
          <Editor className='editor'
            placeholder='Code here...'
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, 'javascript')
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 20,
              backgroundColor: '#1e1e1e',
              color: 'white',
              width: '100%',
              borderRadius: '10px',
              padding: '10px',
            }}
          /> 
           <div className='heading' style={{
            textAlign: "center",
            color: "#ffff",
            width: "100%",
            borderBottom:"2px solid #FFF"
            
          }}>
            <h3>Reveiw</h3>
          </div>
          <div className="review2">
          {response && <ReactMarkdown>{response}</ReactMarkdown>}
        </div>
          <button className="editor-button" onClick={() => Handler()}>
            Review
          </button>
        </div>
        <div className="review">
          {response && <ReactMarkdown>{response}</ReactMarkdown>}
        </div>
      </div>
    </>
  );
}

export default App;
