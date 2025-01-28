// 'use client';

// import { useEffect, useRef } from 'react';

// export function ParticlesBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles: Array<{
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;
//       opacity: number;
//     }> = [];

//     for (let i = 0; i < 50; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         size: Math.random() * 2,
//         speedX: (Math.random() - 0.5) * 0.5,
//         speedY: (Math.random() - 0.5) * 0.5,
//         opacity: Math.random() * 0.5
//       });
//     }

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       particles.forEach(particle => {
//         particle.x += particle.speedX;
//         particle.y += particle.speedY;
        
//         if (particle.x > canvas.width) particle.x = 0;
//         if (particle.x < 0) particle.x = canvas.width;
//         if (particle.y > canvas.height) particle.y = 0;
//         if (particle.y < 0) particle.y = canvas.height;

//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(147, 197, 253, ${particle.opacity})`;
//         ctx.fill();
//       });

//       requestAnimationFrame(animate);
//     }

//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 pointer-events-none z-0"
//     />
//   );
// } 


'use client';

import { useEffect, useRef } from 'react';

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 10);
    const rows = Math.floor(canvas.height / 20);

    // Create an array to hold the "rain" of symbols for each column
    const rain: Array<{ x: number, y: number, symbol: string, speed: number }> = [];

    // Initialize the rain with random symbols
    for (let i = 0; i < columns; i++) {
      rain.push({
        x: i * 20,  // spacing between columns
        y: Math.random() * canvas.height,  // start at a random height
        symbol: getRandomSymbol(),
        speed: Math.random() * 3 + 5,  // random speed
      });
    }

    // Function to get a random symbol from a set of characters
    function getRandomSymbol() {
      // const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";
      const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ"
      return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // translucent background to create fading effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each symbol in the rain
      rain.forEach((symbolObj, index) => {
        // ctx.fillStyle = `rgba(0, 255, 0, 0.8)`; // Green color for Matrix effect
        ctx.fillStyle = `rgba(0, 204, 255, 0.8)`;
        ctx.font = '18px monospace';
        ctx.fillText(symbolObj.symbol, symbolObj.x, symbolObj.y);

        // Update the position of each symbol
        symbolObj.y += symbolObj.speed;

        // Reset symbol to the top once it goes off-screen
        if (symbolObj.y > canvas.height) {
          symbolObj.y = 0;
          symbolObj.symbol = getRandomSymbol(); // Randomize the symbol when it resets
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
