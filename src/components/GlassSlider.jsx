import React, { useState, useCallback } from "react";
import "./glass-slider.scss";

export default function GlassSlider({
  items = [
    { id: 1, title: "Web", body: "WordPress / React / GSAP" },
    { id: 2, title: "Graphic", body: "Posters / Editorial / Branding" },
    { id: 3, title: "About", body: "designer & Front-end" },
  ],
  loop = false,
}) {
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, items.length - 1)),
    [items.length]
  );
  const prev = useCallback(
    () => setIndex((i) => Math.max(i - 1, 0)),
    [items.length]
  );

  return (
    <section className="glass-slider" aria-roledescription="carousel">
      <div className="glass-slider__viewport" aria-live="polite">
        <ul
          className="glass-slider__track"
          style={{ transform: `translatex(${-index * 100}%)` }}
        >
          {items.map((it, i) => (
            <li
              className="glass-slider__slide"
              key={it.id ?? i}
              aria-hidden={i !== index}
            >
              <article className="glass-card">
                <div className="glass-card__body">
                  <h3 className="glass-card__title">{it.title}</h3>
                  <p className="glass-card__text">{it.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/*下部コントロール（矢印＋ドット）*/}
      <nav className="glass-slider__controls" aria-label="Carousel controls">
        <button
          className="arrow prev"
          onClick={prev}
          aria-label="Previous"
          //  端で無効化
          disabled={!loop && index === 0}
        ></button>
        <div className="glass-slider__dots" role="tablist" aria-label="Slides">
          {items.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "is-active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "ture" : undefined}
              onClick={() => setIndex(i)}
            ></button>
          ))}
        </div>
        <button
          className="arrow next"
          onClick={next}
          aria-label="Next"
          //  端で無効化
          disabled={!loop && index === items.length - 1}
        ></button>
      </nav>
    </section>
  );
}
