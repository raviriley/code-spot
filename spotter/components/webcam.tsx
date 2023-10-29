import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CameraIcon } from "lucide-react";

export default function WebCam({
  className,
  ...props
}: {
  className?: string;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [useDefaultCamera, setUseDefaultCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setIsMounted(true);

    if (useDefaultCamera) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          let video = videoRef.current;
          if (!video) throw new Error("Video ref not found");
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.log("Something went wrong: ", err);
        });
    }

    return () => {
      setIsMounted(false);
      if (
        videoRef.current &&
        videoRef.current.srcObject &&
        videoRef.current.srcObject instanceof MediaStream
      ) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [useDefaultCamera]);

  const handleImageError = () => {
    setUseDefaultCamera(true);
  };

  return (
    <div className={cn("")}>
      {isMounted && !useDefaultCamera && (
        <img
          src="http://localhost:5001/video"
          className="transform scaleX[-1] rounded-lg"
          alt="Video Feed"
          onError={handleImageError}
        />
      )}
      {isMounted && useDefaultCamera && (
        <video
          ref={videoRef}
          autoPlay
          muted
          className="transform scaleX[-1] rounded-lg"
        ></video>
      )}
      {!isMounted && (
        <>
          <Skeleton className="h-32 w-full rounded-lg">
            <CameraIcon className="w-12 h-12 text-gray-500 mx-auto" />
          </Skeleton>
        </>
      )}
    </div>
  );
}
