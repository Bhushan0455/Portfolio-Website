import React from 'react';

export default function Marquee({ text, speedClass = 'animate-marquee', bgClass = 'bg-white', borderClass = 'border-y border-navy/10' }) {
  const items = Array(8).fill(text);

  return (
    <div className={`relative w-full overflow-hidden py-4 select-none ${bgClass} ${borderClass}`}>
      <div className={`${speedClass} flex gap-12 whitespace-nowrap`}>
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-12 text-sm sm:text-base font-heading font-semibold uppercase tracking-widest text-navy">
            <span>{item}</span>
            <span className="text-accent">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
