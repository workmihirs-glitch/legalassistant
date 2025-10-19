import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Statistics = () => {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.3);
  const [counts, setCounts] = useState({ cases: 0, clients: 0, years: 0, rate: 0 });
  const hasAnimated = useRef(false);

  const stats = [
    { label: "Cases Won", value: 500, suffix: "+" },
    { label: "Happy Clients", value: 300, suffix: "+" },
    { label: "Years Experience", value: 20, suffix: "+" },
    { label: "Success Rate", value: 95, suffix: "%" },
  ];

  useEffect(() => {
    if (statsVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setCounts({
          cases: Math.floor(500 * progress),
          clients: Math.floor(300 * progress),
          years: Math.floor(20 * progress),
          rate: Math.floor(95 * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounts({ cases: 500, clients: 300, years: 20, rate: 95 });
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [statsVisible]);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={statsRef}
          className="grid grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-8 rounded-2xl bg-background/50 backdrop-blur-lg border border-accent/30 hover:border-accent transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="font-playfair text-6xl font-bold text-accent mb-2">
                {index === 0 && counts.cases}
                {index === 1 && counts.clients}
                {index === 2 && counts.years}
                {index === 3 && counts.rate}
                <span className="text-4xl">{stat.suffix}</span>
              </div>
              <p className="text-foreground/70 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
