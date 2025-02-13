import { useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import "./video.css";

export default function VideoGalleryModal() {
  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  const openVideo = () => setShowVideo(true);
  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideo(false);
  };

  return (
    <>
      
        <div className=" video-container">
          <div className="gallery-item" onClick={openVideo}>
            <img src="/videos/thumbnail.png" alt="Video preview" />
          </div>

          <div className="play-button">
            <button className="button" onClick={openVideo}>
              <img  className='w-100' src="/videos/play.png" alt="play" />
            </button>
          </div>
        </div>
    

      {showVideo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeVideo}>&times;</button>
            <video ref={videoRef} controls className="modal-image">
              <source src="/videos/lebon.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
