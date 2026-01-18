def fuse_emotions(text_result, audio_result, mode="personal"):
    scores = {
        "calm": 0,
        "happy": 0,
        "energetic": 0,
        "neutral": 0
    }

    # Base scores
    scores[text_result["emotion"]] += text_result["score"]
    scores[audio_result["emotion"]] += audio_result["score"]

    # Mode bias
    if mode == "wellness":
        scores["calm"] += 0.5
    elif mode == "social":
        scores["energetic"] += 0.5

    final_emotion = max(scores, key=scores.get)
    confidence = min(scores[final_emotion], 1.0)

    return {
        "emotion": "calm" if final_emotion == "stressed" else final_emotion,
        "confidence": round(confidence * 100, 2),
        "scores": scores
    }