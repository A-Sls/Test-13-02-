import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WheatParticle {
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
}

export function FallingWheat() {
    const [particles, setParticles] = useState<WheatParticle[]>([]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 10 : 25;

        // Generate wheat particles
        const newParticles: WheatParticle[] = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 10,
            size: isMobile ? (1 + Math.random() * 2) : (2 + Math.random() * 4)
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-gradient-to-br from-amber-300 to-yellow-600"
                    style={{
                        left: `${particle.x}%`,
                        top: -10,
                        width: particle.size,
                        height: particle.size,
                        willChange: 'transform, opacity'
                    }}
                    animate={{
                        y: ['0vh', '110vh'],
                        x: [0, Math.sin(particle.id) * 30, 0],
                        rotate: [0, 360],
                        opacity: [0, 0.7, 0.7, 0]
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.1, 0.9, 1]
                    }}
                />
            ))}
        </div>
    );
}
