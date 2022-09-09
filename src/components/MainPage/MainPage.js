import {useState, useRef, useEffect} from 'react'
import './MainPage.css'
import leftswipe from '../../gifs/left_swipe.gif'
import rightswipe from '../../gifs/right_swipe.gif'
import stop from '../../gifs/stop.gif'
import tumbs_down from '../../gifs/tumbs_down.gif'
import tumbs_up from '../../gifs/tumbs_up.gif'

function MainPage() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [prediction, setPrediction] = useState('')
    const [dropDown, setDropDown] = useState(false)

    const inputRef = useRef(null);
    useEffect(()=>{
        fetch('https://gesture-recognition-api.herokuapp.com/', {
            method: 'GET',
        });
    }, [])
    const predict_api = (e)=>{
        setPrediction('Loading...')
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
            <h5 className='result'>{prediction}</h5>
            <div className='instruct'>
                <h4 style={{margin:'3px'}}>Instructions:</h4>
                <p>
                    1. Record a video with one of the following gestures right swipe, left swipe, stop, tumbs down and tumbs up
                </p>
                <p>
                    2. Make sure the video length is below 3 seconds with less than 5Mb size
                </p>
                <p>
                    3. Upload the video and click on submit
                </p>
                <p>
                    4. App will recognise the gesture and returns the result
                </p>
            </div>
            <button onClick={()=>setDropDown(!dropDown)}>Demo</button>
            {
            dropDown && <div className='demogifs'>
                <div>
                    <img src={leftswipe} alt='Left Swipe'/>
                    <p>Left Swipe</p>  
                </div>
                <div>
                    <img src={rightswipe} alt='Right Swipe'/>
                    <p>Right Swipe</p>  
                </div>
                <div>
                    <img src={stop} alt='Stop'/>
                    <p>Stop</p>  
                </div>
                <div>
                    <img src={tumbs_down} alt='Tumbs Down'/>
                    <p>Tumbs Down</p>  
                </div>
                <div>
                    <img src={tumbs_up} alt='Tumbs Up'/>
                    <p>Tumbs Up</p>  
                </div>
            </div>
            }
        </>
    )
}

export default MainPage