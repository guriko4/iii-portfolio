import React, { useState, useCallback, useRef } from "react";
import "./glass-slider.scss";

export default function GlassSlider({ items = [] }) {
  const [index, setIndex] = useState(0);

  //  スワイプ設定
  const startX = useRef(0);
  const deltaX = useRef(0);

  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, items.length - 1)),
    [items.length]
  );
  const prev = useCallback(
    () => setIndex((i) => Math.max(i - 1, 0)),
    [items.length]
  );

  //  スワイプハンドラ
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    deltaX.curremt = 0;
  };
  const onTouchMove = (e) => {
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const THRESHOLD = 40;
    if (deltaX.current > THRESHOLD) prev();
    else if (deltaX.current < -THRESHOLD) next();
    deltaX.current = 0;
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  };

  return (
    <section className="slider-container">
      <div className="glass-slider" aria-roledescription="carousel">
        <div
          className="glass-slider__viewport"
          aria-live="polite"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <ul
            className="glass-slider__track"
            style={{ transform: `translateX(${-index * 100}%)` }}
          >
            {items.map((it, i) => (
              <li
                className="glass-slider__slide"
                key={it.id ?? i}
                aria-hidden={i !== index}
              >
                <article className="glass-card">
                  <div className="glass-card__body">
                    <div className="glass-card__text">
                      <h3>{it.title}</h3>
                      {it.tools && (
                        <div className="tools">
                          {it.tools.design && (
                            <div>
                              <strong>デザイン</strong>
                              <p>{it.tools.design}</p>
                            </div>
                          )}
                          {it.tools.frontend && (
                            <div>
                              <strong>フロントエンド</strong>
                              <p>{it.tools.frontend}</p>
                            </div>
                          )}
                          {it.tools.environment && (
                            <div className="card-last">
                              <strong>開発環境</strong>
                              <p>{it.tools.environment}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="glass-card__img">{it.body}</div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {/*下部コントロール（矢印＋ドット）*/}
        {items.length > 1 && (
          <nav
            className="glass-slider__controls"
            aria-label="Carousel controls"
          >
            <button
              className="arrow prev"
              onClick={prev}
              aria-label="Previous"
              //  端で無効化
              disabled={index === 0}
            ></button>
            <div
              className="glass-slider__dots"
              role="tablist"
              aria-label="Slides"
            >
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === index ? "is-active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                ></button>
              ))}
            </div>
            <button
              className="arrow next"
              onClick={next}
              aria-label="Next"
              //  端で無効化
              disabled={index === items.length - 1}
            ></button>
          </nav>
        )}
      </div>
    </section>
  );
}
