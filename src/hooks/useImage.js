import { useState, useEffect, useRef } from "react";
import ImageDefault from "../assets/images/imageDefault.jpg"; 

const useImage = (url) =>{
    const [image, setImage] = useState(url);
    const imgRef = useRef(null);

    useEffect(() => {
        imgRef.current = new Image();
        imgRef.current.src = url;
    
        const handleLoad = () => {
          setImage(url);
        };
    
        const handleError = () => {
          setImage(ImageDefault);
        };
    
        imgRef.current.addEventListener("load", handleLoad);
        imgRef.current.addEventListener("error", handleError);
    
        return () => {
          imgRef.current.removeEventListener("load", handleLoad);
          imgRef.current.removeEventListener("error", handleError);
        };

}, [url])

return image;

}

export default useImage;