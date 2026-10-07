import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [mood, setMood] = useState("Detecting...");
  const [confidence, setConfidence] = useState(0);
  const [ready, setReady] = useState(false);

  // ---------------------------------------
  // 1. Initialize MediaPipe
  // ---------------------------------------

  useEffect(() => {
    const initializeMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );

        const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "/models/face_landmarker.task",
            delegate: "GPU",
          },

          runningMode: "VIDEO",

          numFaces: 1,

          outputFaceBlendshapes: true,

          minFaceDetectionConfidence: 0.5,
          minFacePresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        landmarkerRef.current = faceLandmarker;

        await startCamera();

        setReady(true);
      } catch (error) {
        console.error("MediaPipe initialization error:", error);
      }
    };

    initializeMediaPipe();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // ---------------------------------------
  // 2. Start webcam
  // ---------------------------------------

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        detectFace();
      }
    } catch (error) {
      console.error("Camera permission error:", error);
      alert("Please allow camera access.");
    }
  };

  // ---------------------------------------
  // 3. Detect face
  // ---------------------------------------

  const detectFace = () => {
    if (
      !videoRef.current ||
      !landmarkerRef.current ||
      videoRef.current.readyState < 2
    ) {
      animationRef.current = requestAnimationFrame(detectFace);
      return;
    }

    const video = videoRef.current;

    const results = landmarkerRef.current.detectForVideo(
      video,
      performance.now(),
    );

    if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;

      const expression = getExpression(blendshapes);

      setMood(expression.mood);
      setConfidence(expression.confidence);
    } else {
      setMood("No face");
      setConfidence(0);
    }

    animationRef.current = requestAnimationFrame(detectFace);
  };

  // ---------------------------------------
  // 4. Get blendshape score
  // ---------------------------------------

  const getScore = (blendshapes, name) => {
    const shape = blendshapes.find((item) => item.categoryName === name);

    return shape ? shape.score : 0;
  };

  // ---------------------------------------
  // 5. Convert facial movements to mood
  // ---------------------------------------

  const getExpression = (b) => {
    const smileLeft = getScore(b, "mouthSmileLeft");
    const smileRight = getScore(b, "mouthSmileRight");

    const frownLeft = getScore(b, "mouthFrownLeft");
    const frownRight = getScore(b, "mouthFrownRight");

    const browDownLeft = getScore(b, "browDownLeft");
    const browDownRight = getScore(b, "browDownRight");

    const browInnerUp = getScore(b, "browInnerUp");

    const eyeWideLeft = getScore(b, "eyeWideLeft");
    const eyeWideRight = getScore(b, "eyeWideRight");

    const jawOpen = getScore(b, "jawOpen");

    const mouthOpen = getScore(b, "mouthOpen");

    const cheekSquintLeft = getScore(b, "cheekSquintLeft");
    const cheekSquintRight = getScore(b, "cheekSquintRight");

    // Average values
    const smile = (smileLeft + smileRight) / 2;

    const frown = (frownLeft + frownRight) / 2;

    const browDown = (browDownLeft + browDownRight) / 2;

    const eyeWide = (eyeWideLeft + eyeWideRight) / 2;

    const cheekSquint = (cheekSquintLeft + cheekSquintRight) / 2;

    // ---------------------------------------
    // HAPPY
    // ---------------------------------------

    const happyScore = smile * 0.7 + cheekSquint * 0.3;

    // ---------------------------------------
    // SAD
    // ---------------------------------------

    const sadScore = frown * 0.6 + browInnerUp * 0.4;

    // ---------------------------------------
    // ANGRY
    // ---------------------------------------

    const angryScore = browDown * 0.7 + frown * 0.3;

    // ---------------------------------------
    // SURPRISED
    // ---------------------------------------

    const surprisedScore = eyeWide * 0.45 + browInnerUp * 0.25 + jawOpen * 0.3;

    // ---------------------------------------
    // Find strongest expression
    // ---------------------------------------

    const expressions = [
      {
        mood: "Happy 😊",
        score: happyScore,
      },
      {
        mood: "Sad 😢",
        score: sadScore,
      },
      {
        mood: "Angry 😡",
        score: angryScore,
      },
      {
        mood: "Surprised 😮",
        score: surprisedScore,
      },
    ];

    expressions.sort((a, b) => b.score - a.score);

    const strongest = expressions[0];

    // Minimum threshold
    if (strongest.score < 0.35) {
      return {
        mood: "Neutral 😐",
        confidence: 0,
      };
    }

    return {
      mood: strongest.mood,
      confidence: Math.min(Math.round(strongest.score * 100), 99),
    };
  };

  return (
    <div className="app">
      <h1>AI Face Mood Detector</h1>

      <div className="camera-container">
        <video ref={videoRef} className="camera" autoPlay muted playsInline />

        <div className="mood-box">
          <div className="mood">{mood}</div>

          {mood !== "No face" &&
            mood !== "Detecting..." &&
            mood !== "Neutral 😐" && (
              <div className="confidence">Confidence: {confidence}%</div>
            )}
        </div>
      </div>

      {!ready && <p className="loading">Loading MediaPipe...</p>}
    </div>
  );
}

export default FaceExpression
