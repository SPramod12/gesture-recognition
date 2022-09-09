import {useState, useRef} from 'react'
import './MainPage.css'

function MainPage() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [prediction, setPrediction] = useState('')

    const inputRef = useRef(null);

    const predict_api = (e)=>{
        setPrediction('')
        e.preventDefault()
        const formData = new FormData();
        formData.append('video', selectedFile);
        console.log(formData)
        fetch('https://gesture-recognition-api.herokuapp.com/predict', {
            method: 'POST',
            body: formData,
        }).then(res=>res.json()).then(res=>setPrediction(res['prediction']));
        resetFileInput()
        setSelectedFile(null)
    };

    const uploadVideo = (e)=>{
        setSelectedFile(e.target.files[0])
    };

    const resetFileInput = () => {
        inputRef.current.value = null;
    };

    return (
        <>
        <h1> Gesture Recognition App</h1>
        <div className='upload'>
            <form  onSubmit={predict_api}>
                <div>
                    <h3>Upload Gesture Here</h3>
                </div>
                <div className='uploadform'>
                    <input ref={inputRef} type='file' name='video' accept="video/mp4,video/x-m4v,video/*" onChange={uploadVideo}/>
                    <input type='submit'/>
                </div>
            </form>
        </div>
        <h5>{prediction}</h5>
        <div className='instruct'>
            <h4>Instructions:</h4>
        </div>
        </>
    )
}

export default MainPage