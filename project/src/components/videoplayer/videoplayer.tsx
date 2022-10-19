import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  poster: string;
  videoLink: string;
};

export default function Videoplayer(props: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      videoRef.current?.play();
    }, 1000);
    return () => clearTimeout(timeout);
  });

  return (
    <video
      ref={videoRef}
      src={props.videoLink}
      poster={props.poster}
      height={175}
      muted
    />
  );
}
