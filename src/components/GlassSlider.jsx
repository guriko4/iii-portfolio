import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./glass-slider.scss";

export default function GlassSlider({ items = [], variant = "web" }) {
  const [index, setIndex] = useState(0);
  const [viewMode, setViewMode] = useState(
    variant === "graphic" ? "cover" : "pc"
  );
  const [modalSrc, setModalSrc] = useState(null);
  const [modalMode, setModalMode] = useState("pc");

  // スクロール位置保存用
  const scrollYRef = useRef(0);

  // モーダル開閉に応じて背景スクロールをロック/解除
  useEffect(() => {
    if (!modalSrc) return; // 開いたときだけ実行
    scrollYRef.current = window.scrollY;
    const y = scrollYRef.current;

    // ロック
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      // 解除して元の位置へ
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, -parseInt(top || "0", 10) || 0);
    };
  }, [modalSrc]);

  //  カード内のプレビュー表示
  //  スライド切り替えたら初期モードに戻す
  useEffect(() => {
    setViewMode(variant === "graphic" ? "cover" : "pc");
  }, [index, variant]);

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
    deltaX.current = 0;
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

  //  キー操作
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  };

  //  モーダル
  const openModal = (src) => {
    setModalSrc(src);
    setModalMode(viewMode); // ← 開いたときの状態を保存
  };
  const closeModal = () => setModalSrc(null);
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && closeModal();
    if (modalSrc) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [modalSrc]);

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
            {items.map((it, i) => {
              let activeSrc = "";
              if (variant === "graphic") {
                const g = it.preview || {};
                if (g.cover && g.spread) {
                  activeSrc = viewMode === "spread" ? g.spread : g.cover;
                } else if (g.front && g.back) {
                  activeSrc = viewMode === "back" ? g.back : g.front;
                } else {
                  activeSrc = g.single || "";
                }
              } else {
                const hasPC = !!it.preview?.pc || !!it.image; // 後方互換: imageをPC扱い
                const hasSP = !!it.preview?.sp;
                activeSrc =
                  (viewMode === "sp" && hasSP && it.preview.sp) ||
                  it.preview?.pc ||
                  it.image ||
                  "";
              }
              return (
                <li
                  className="glass-slider__slide"
                  key={it.id ?? i}
                  aria-hidden={i !== index}
                >
                  <article
                    className="glass-card"
                    aria-labelledby={`slide-title-${it.id ?? index}`}
                  >
                    <div className="glass-card__body">
                      {/*左テキスト*/}
                      <div className="glass-card__text">
                        <div className="glass-card__title-wrap">
                          <div className="glass-card__title">
                            <h3 id={`slide-title-${it.id ?? index}`}>
                              {it.title}
                            </h3>
                          </div>
                          {it.url && (
                            <a
                              className="link-icon"
                              href={it.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="外部サイトを新しいタブで開く"
                            >
                              <span className="material-icons">link</span>
                            </a>
                          )}
                        </div>
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
                        {it.graphic_tools && (
                          <div className="tools">
                            {it.graphic_tools.software && (
                              <div>
                                <strong>デザイン</strong>
                                <p>{it.graphic_tools.software}</p>
                              </div>
                            )}
                            {it.graphic_tools.role && (
                              <div className="card-last">
                                <strong>担当業務</strong>
                                <p>{it.graphic_tools.role}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* プレビュー切替（Web or Graphic） */}
                        {variant !== "graphic" ? (
                          <div
                            className="preview-toggle"
                            role="tablist"
                            aria-label="デバイス切り替え"
                          >
                            {!!it.preview?.pc || !!it.image ? (
                              <button
                                type="button"
                                className={`toggle ${
                                  viewMode === "pc" ? "is-active" : ""
                                }`}
                                onClick={() => setViewMode("pc")}
                                aria-pressed={viewMode === "pc"}
                              >
                                PC表示
                              </button>
                            ) : null}
                            {it.preview?.sp && (
                              <button
                                type="button"
                                className={`toggle ${
                                  viewMode === "sp" ? "is-active" : ""
                                }`}
                                onClick={() => setViewMode("sp")}
                                aria-pressed={viewMode === "sp"}
                              >
                                スマホ表示
                              </button>
                            )}
                          </div>
                        ) : (
                          <div
                            className="preview-toggle"
                            role="tablist"
                            aria-label="ページ切り替え"
                          >
                            {it.preview?.cover && it.preview?.spread && (
                              <>
                                <button
                                  type="button"
                                  className={`toggle ${
                                    viewMode === "cover" ? "is-active" : ""
                                  }`}
                                  onClick={() => setViewMode("cover")}
                                >
                                  表紙
                                </button>
                                <button
                                  type="button"
                                  className={`toggle ${
                                    viewMode === "spread" ? "is-active" : ""
                                  }`}
                                  onClick={() => setViewMode("spread")}
                                >
                                  見開き
                                </button>
                              </>
                            )}
                            {it.preview?.front && it.preview?.back && (
                              <>
                                <button
                                  type="button"
                                  className={`toggle ${
                                    viewMode === "front" ? "is-active" : ""
                                  }`}
                                  onClick={() => setViewMode("front")}
                                >
                                  表面
                                </button>
                                <button
                                  type="button"
                                  className={`toggle ${
                                    viewMode === "back" ? "is-active" : ""
                                  }`}
                                  onClick={() => setViewMode("back")}
                                >
                                  裏面
                                </button>
                              </>
                            )}
                          </div>
                        )}

                        {/*コメント*/}
                        {it.comment && (
                          <p className="glass-card__comment">{it.comment}</p>
                        )}
                      </div>

                      {/* 右：プレビュー（クロップ表示・クリックで拡大） */}
                      <div
                        className={`glass-card__img ${viewMode} ${
                          variant === "graphic" && viewMode === "spread"
                            ? "is-scroll-x"
                            : ""
                        }`}
                      >
                        {activeSrc ? (
                          <img
                            src={activeSrc}
                            alt={`${
                              it.title
                            } ${viewMode.toUpperCase()}プレビュー`}
                            loading="lazy"
                            decoding="async"
                            onClick={() => openModal(activeSrc)}
                            style={{ cursor: "zoom-in" }}
                          />
                        ) : (
                          <div className="img--placeholder">No preview</div>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
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

        {/*モーダル（背景はクリックで閉じる）*/}
        {modalSrc &&
          createPortal(
            <div
              className="modal"
              role="dialog"
              aria-modal="true"
              onClick={closeModal}
            >
              <div
                className="modal__inner"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal__close"
                  onClick={closeModal}
                  aria-label="閉じる"
                >
                  ×
                </button>
                <div className={`modal__content ${modalMode}`}>
                  <img src={modalSrc} alt="拡大プレビュー" />
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </section>
  );
}
