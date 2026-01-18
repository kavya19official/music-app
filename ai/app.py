from fastapi import FastAPI
from pydantic import BaseModel

from emotion_text import detect_text_emotion
from emotion_audio import detect_audio_emotion
from emotion_fusion import fuse_emotions

app = FastAPI(title="Auralyn AI Engine")

class EmotionRequest(BaseModel):
    text: str = ""
    noiseLevel: float = 0
    mode: str = "personal"

@app.post("/detect-emotion")
def detect_emotion(req: EmotionRequest):
    text_result = detect_text_emotion(req.text)
    audio_result = detect_audio_emotion(req.noiseLevel)

    fused = fuse_emotions(text_result, audio_result, req.mode)

    return {
        "success": True,
        "input": req.dict(),
        "text_analysis": text_result,
        "audio_analysis": audio_result,
        "final_result": fused
    }