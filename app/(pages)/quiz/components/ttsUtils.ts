// TTS 및 사운드 유틸 함수
export function playSound(type: "correct" | "wrong") {
    const audio = new Audio(type === "correct" ? "/correct.mp3" : "/wrong.mp3");
    audio.play();
}

export function speakJapanese(text: string, onEnd?: () => void) {
    if (typeof window !== "undefined" && window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance(text);
        utter.lang = "ja-JP";
        const voices = window.speechSynthesis.getVoices();
        const jaVoice = voices.find(v => v.lang === "ja-JP");
        if (jaVoice) utter.voice = jaVoice;
        if (onEnd) utter.onend = onEnd;
        window.speechSynthesis.speak(utter);
    } else if (onEnd) {
        onEnd();
    }
} 