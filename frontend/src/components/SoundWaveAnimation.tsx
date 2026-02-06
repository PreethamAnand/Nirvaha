import { useEffect, useRef } from 'react';

export function SoundWaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let animationFrameId: number;
    let time = 0;
    
    // Create frequency bars data
    const frequencyBars = Array.from({ length: 32 }, (_, i) => ({
      index: i,
      value: 0,
      targetValue: 0,
    }));

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear with white background
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // White
      ctx.fillRect(0, 0, width, height);

      // Update frequency bars with smooth animation
      frequencyBars.forEach((bar, idx) => {
        // Create multiple frequency patterns for more dynamic effect
        const freq1 = Math.sin((time + idx) * 0.05) * 0.5 + 0.5;
        const freq2 = Math.cos((time + idx * 0.3) * 0.03) * 0.5 + 0.5;
        const freq3 = Math.sin((time * 0.02 + idx * 0.2) * Math.PI / 180) * 0.5 + 0.5;
        
        bar.targetValue = ((freq1 * 0.4 + freq2 * 0.35 + freq3 * 0.25) * 80 + 20) * 1.5; // Increased to 1.5x
        bar.value += (bar.targetValue - bar.value) * 0.1; // Smooth animation
      });

      // Draw frequency bars with light blue gradient
      const barWidth = width / frequencyBars.length;
      const centerY = height / 2;
      const barGap = 8; // Gap between bars (doubled)
      const barRadius = 16; // Rounded corners

      frequencyBars.forEach((bar, idx) => {
        const x = idx * barWidth + barGap / 2;
        const barHeight = bar.value;
        const actualBarWidth = barWidth - barGap - 2; // Decreased by 2px
        
        // Create gradient for each bar - light blue to cyan
        const barGradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY + barHeight);
        barGradient.addColorStop(0, 'rgba(147, 197, 253, 0.8)'); // Light blue
        barGradient.addColorStop(0.5, 'rgba(165, 243, 252, 0.9)'); // Light cyan
        barGradient.addColorStop(1, 'rgba(186, 230, 253, 0.8)'); // Light sky blue
        
        ctx.fillStyle = barGradient;
        // Draw rounded rectangle
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight, actualBarWidth, barHeight * 2, barRadius);
        ctx.fill();
        
        // Add glow effect with light blue
        ctx.shadowColor = 'rgba(147, 197, 253, 0.6)';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      ctx.shadowBlur = 0;

      // Draw smooth waveform overlay with light blue
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.6)'; // Medium blue
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const normalizedX = x / width;
        
        // Create multiple overlapping sine waves
        const wave1 = Math.sin((normalizedX * Math.PI * 8 + time * 0.03) * Math.PI) * 15;
        const wave2 = Math.sin((normalizedX * Math.PI * 4 + time * 0.02) * Math.PI) * 10;
        const wave3 = Math.cos((normalizedX * Math.PI * 6 + time * 0.025) * Math.PI) * 8;
        
        const y = centerY + wave1 + wave2 + wave3;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw circular particle animation in center with light colors
      ctx.fillStyle = 'rgba(165, 243, 252, 0.4)'; // Light cyan
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.02 + (i / 8) * Math.PI * 2);
        const x = width / 2 + Math.cos(angle) * 60;
        const y = centerY + Math.sin(angle) * 30;
        const radius = Math.sin(time * 0.01 + i) * 3 + 4;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-transparent rounded-3xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
