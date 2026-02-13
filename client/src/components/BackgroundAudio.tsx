import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Music, AlertCircle, RefreshCw } from "lucide-react";

export function BackgroundAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const tryPlay = () => {
        if (!audioRef.current) return;

        setErrorMsg(null);
        audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
                setIsAutoplayBlocked(false);
                setErrorMsg(null);
            })
            .catch((err) => {
                if (err.name === "NotAllowedError" || err.message?.includes("interact")) {
                    console.warn("Autoplay was blocked by the browser.");
                    setIsAutoplayBlocked(true);
                    setIsPlaying(false);
                } else {
                    console.error("Audio playback error:", err);
                    setErrorMsg(err.message || "Playback Error");
                }
            });
    };

    // Reload the audio element entirely
    const handleReload = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (!audioRef.current) return;

        setErrorMsg(null);
        setIsAutoplayBlocked(false);
        audioRef.current.load();
        tryPlay();
    };

    useEffect(() => {
        // Initial attempt to play
        const timer = setTimeout(() => {
            tryPlay();
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleInteraction = () => {
            if (isAutoplayBlocked || (!isPlaying && !errorMsg)) {
                tryPlay();
            }
        };
        window.addEventListener("mousedown", handleInteraction, { once: true });
        return () => window.removeEventListener("mousedown", handleInteraction);
    }, [isAutoplayBlocked, isPlaying, errorMsg]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            setIsAutoplayBlocked(false);
        } else {
            tryPlay();
        }
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        const newMutedState = !isMuted;
        audioRef.current.muted = newMutedState;
        setIsMuted(newMutedState);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3">
            <audio
                ref={audioRef}
                loop
                preload="auto"
                onStalled={() => {
                    console.warn("Audio stalled");
                }}
                onError={(e) => {
                    const error = (e.target as HTMLAudioElement).error;
                    let msg = "Error";
                    if (error) {
                        switch (error.code) {
                            case 1: msg = "Aborted"; break;
                            case 2: msg = "Network"; break;
                            case 3: msg = "Decode"; break;
                            case 4: msg = "Source"; break;
                        }
                        console.error(`Audio error [${error.code}]: ${msg}`, error);
                    }
                    setErrorMsg(msg);
                }}
                src="/music.mp3"
            />

            <motion.div
                className={`flex items-center gap-2 backdrop-blur-xl border p-2 px-4 rounded-full shadow-2xl transition-colors duration-500 ${errorMsg ? 'bg-red-950/60 border-red-500/50' : 'bg-black/60 border-gold/40'
                    }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex gap-1 h-3 items-end mr-2">
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className={`w-0.5 ${errorMsg ? 'bg-red-500' : isAutoplayBlocked ? 'bg-gold/30' : 'bg-gold'}`}
                            animate={isPlaying && !isMuted && !errorMsg ? {
                                height: [4, 12, 4],
                            } : { height: 4 }}
                            transition={{
                                duration: 0.5 + i * 0.1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                {errorMsg && (
                    <button
                        onClick={handleReload}
                        className="p-1 px-2 mr-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-md flex items-center gap-1.5 transition-colors group"
                        title="Réessayer de charger"
                    >
                        <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-[9px] font-bold tracking-tighter uppercase whitespace-nowrap">Retry</span>
                    </button>
                )}

                <button
                    onClick={togglePlay}
                    className={`p-1.5 rounded-full transition-all duration-300 flex items-center gap-2 ${errorMsg ? 'text-red-500' :
                        isAutoplayBlocked ? 'bg-gold/10 text-gold/70' :
                            isPlaying ? 'bg-gold/20 text-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'hover:bg-white/10 text-gold/60'
                        }`}
                    title={
                        errorMsg ? `Erreur: ${errorMsg}` :
                            isAutoplayBlocked ? "Cliquer pour activer le son" :
                                isPlaying ? "Désactiver la musique" : "Activer la musique"
                    }
                >
                    {errorMsg ? <AlertCircle className="w-4 h-4" /> : <Music className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />}
                    <span className="text-[10px] font-medium tracking-wider uppercase px-1">
                        {errorMsg ? errorMsg : isAutoplayBlocked ? "Play" : isPlaying ? "On" : "Off"}
                    </span>
                </button>

                {!errorMsg && (
                    <>
                        <div className="w-px h-4 bg-gold/20 mx-1" />
                        <button
                            onClick={toggleMute}
                            className={`p-1.5 hover:bg-white/10 rounded-full transition-colors ${isMuted ? 'text-red-400' : 'text-gold/80'}`}
                            title={isMuted ? "Réactiver le son" : "Couper le son"}
                        >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
}
