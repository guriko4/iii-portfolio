import React from "react";
import "./glass-slider.scss";

export default function GlassSlider({
  items = [{ id: 1, title: "Sample", body: "Hello Glass Slider!" }],
}) {
  return (
    <section className="glass-slider">
      <div className="glass-slider__viewport">
        <ul className="glass-slider__track">
          {items.map((it, i) => (
            <li className="glass-slider__slide" key={it.id ?? i}>
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
    </section>
  );
}
