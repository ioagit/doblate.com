import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import type { Fact } from '../types/game';
import { categoryLabel } from '../utils/spanish';

interface FactCarouselProps {
  facts: Fact[];
  position: number;
  onPositionChange: (index: number) => void;
  onFactViewed: (index: number) => void;
}

export const FactCarousel = ({
  facts,
  position,
  onPositionChange,
  onFactViewed,
}: FactCarouselProps) => {
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const onFactViewedRef = useRef(onFactViewed);

  useEffect(() => {
    onFactViewedRef.current = onFactViewed;
  }, [onFactViewed]);

  useEffect(() => {
    onFactViewedRef.current(position);
  }, [position]);

  const goTo = useCallback(
    (index: number) => {
      if (facts.length === 0) return;
      const next = (index + facts.length) % facts.length;
      onPositionChange(next);
    },
    [facts.length, onPositionChange],
  );

  const handlePrev = () => goTo(position - 1);
  const handleNext = () => goTo(position + 1);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNext();
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    setDragOffset(event.clientX - startX.current);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    setDragOffset(0);
    if (delta > 50) handlePrev();
    if (delta < -50) handleNext();
  };

  const current = facts[position];

  return (
    <section
      className="carousel"
      aria-roledescription="carrusel"
      aria-label="Datos del nivel"
    >
      <div
        ref={regionRef}
        className="carousel-viewport"
        role="group"
        aria-live="polite"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          startX.current = null;
          setDragOffset(0);
        }}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(calc(${-position * 100}% + ${dragOffset}px))`,
          }}
        >
          {facts.map((fact) => (
            <article key={fact.id} className="carousel-slide">
              <span className="fact-category">{categoryLabel(fact.category)}</span>
              <p className="fact-text">{fact.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handlePrev}
          aria-label="Dato anterior"
        >
          Anterior
        </button>
        <div className="carousel-status" aria-live="polite">
          {position + 1} de {facts.length}
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleNext}
          aria-label="Dato siguiente"
        >
          Siguiente
        </button>
      </div>

      <div className="dots" role="tablist" aria-label="Posición del dato">
        {facts.map((fact, index) => (
          <button
            key={fact.id}
            type="button"
            className="dot"
            role="tab"
            aria-label={`Ir al dato ${index + 1}`}
            aria-current={index === position ? 'true' : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>

      {current ? <span className="sr-only">Dato actual: {current.text}</span> : null}
    </section>
  );
};
