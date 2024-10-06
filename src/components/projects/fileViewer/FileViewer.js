import React, { useState, useEffect, useRef } from 'react';
import './FileViewer.css';
import { styled } from '@mui/material/styles';
import * as MuiComp from '@mui/material/';
import * as MuiIcon from '@mui/icons-material/';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function FileViewer() {
    const [uploadButtonVisibility, setUploadButtonVisibility] = useState(true);
    const [txtContent, setTxtContent] = useState('');
    const [displayedContent, setDisplayedContent] = useState('');
    const viewerRef = useRef(null);
    const isUserScrolling = useRef(false);
    const [fileName, setFileName] = useState('')

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'auto',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        const typingInterval = setInterval(() => {
            setDisplayedContent((prev) => {
                const nextChar = txtContent.charAt(prev.length);
                return prev + nextChar;
            });

            // Auto-scroll to the bottom
            if (viewerRef.current && !isUserScrolling.current) {
                viewerRef.current.scrollTop = viewerRef.current.scrollHeight;
            }
        }, 5); // Adjust the interval (in milliseconds) as needed

        return () => clearInterval(typingInterval);
    }, [txtContent, isUserScrolling]);

    const handleScroll = () => {
        // Set the flag indicating user scrolling
        isUserScrolling.current = true;

        // Clear the flag after a short delay (adjust as needed)
        // setTimeout(() => {
        //     isUserScrolling.current = false;
        // }, 500);
    };

    const upload = (e) => {
        setDisplayedContent('')
        setUploadButtonVisibility(!uploadButtonVisibility);
        const file = e.target.files[0];
        setFileName(file.name)

        const imgFormat = ['png', 'jpg']
        // Get the file format (extension)
        const format = file.name.split('.').pop();

        // File Reader
        txtReader(file);
    };

    const txtReader = (file) => {
        setDisplayedContent('')
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = String(event.target.result).replace(/<br>/g, '\n');
            console.log('File Content:', content);
            setTxtContent(content);
        };
        reader.readAsText(file);
    };

    const handleCopy = () => {
        // Create a textarea element to hold the content
        const textarea = document.createElement('textarea');
        textarea.value = displayedContent;
        document.body.appendChild(textarea);

        // Select the content
        textarea.select();
        document.execCommand('copy');

        // Remove the textarea from the DOM
        document.body.removeChild(textarea);

        const copiedPopUp = document.getElementById('copiedPopUp');
        copiedPopUp.style.display = 'block'
        setTimeout(() => {
            copiedPopUp.style.display = 'none'
        }, 2000);

    };

    return (
        <>
            <div className='main-fileViewer'>
                    <div style={{width:'100%', display:uploadButtonVisibility?'block':'flex', justifyContent:uploadButtonVisibility?'center':'space-between'}}>
                        <h1 style={{marginLeft:uploadButtonVisibility?'0px':'1rem'}}> Code File Viewer </h1>
                        <MuiComp.Button className='fileUploading-Button' component="label" variant="contained" 
                            startIcon={uploadButtonVisibility?<MuiIcon.CloudUpload/>: <MuiIcon.ReplyAll/>}>
                            { uploadButtonVisibility? 'Upload Code File' : 'Back To FileUpload' }
                            <VisuallyHiddenInput onChange={uploadButtonVisibility? upload: ()=>{}} 
                                onClick={()=> uploadButtonVisibility?()=>setDisplayedContent(''):setUploadButtonVisibility(true)} 
                                type={uploadButtonVisibility?"file":""} />
                        </MuiComp.Button> 
                    </div>
                
                {!uploadButtonVisibility && 
                    <div className='content-container' ref={viewerRef} onScroll={handleScroll}>
                        <div className='copy-content'>
                            <div style={{display:'flex',justifyContent:'space-between', alignItems:'center',height:'20px'}}>
                                <p>{fileName}</p>
                                <p id='copiedPopUp' style={{marginRight:'20px',display:'none'}}> 
                                    Copied
                                </p>
                                <MuiIcon.FileCopy style={{cursor: 'pointer'}} onClick={handleCopy}/>
                            </div>
                        </div>
                        <div style={{marginBottom:'40px'}}></div>
                        <div className='code-text'>
                        <SyntaxHighlighter language="javascript" style={vscDarkPlus} >
                           {displayedContent} 
                        </SyntaxHighlighter>
                        </div>
                        
                    </div>}

            </div>
        </>
    )
}

export default FileViewer;
