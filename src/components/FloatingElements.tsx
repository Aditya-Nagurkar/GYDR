import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
}

export default function FloatingElements({
  count = 5,
  colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4', '#0891b2'],
}: FloatingElementsProps) {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
    }));
    setElements(newElements);
  }, [count, colors]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {elements.map(element => (
        <motion.div
          key={element.id}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            backgroundColor: element.color,
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
}
