import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import GlassSlider from "./components/GlassSlider";
import WebSlider from "./components/sliders/WebSlider";
import GraphicSlider from "./components/sliders/GraphicSlider";
import AboutSlider from "./components/sliders/AboutSlider";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [maskActive, setMaskActive] = useState(false);
  const titleImgRef = useRef(null);

  // ESCで閉じる & 背景スクロールロック
  //useEffect(() => {
  //  const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
  //  if (menuOpen) document.documentElement.style.overflow = "hidden";
  //  else document.documentElement.style.overflow = "";
  //  window.addEventListener("keydown", onKey);
  //  return () => window.removeEventListener("keydown", onKey);
  //}, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      const id = setTimeout(() => setMaskActive(true), 180);
      return () => {
        clearTimeout(id);
        setMaskActive(false);
      };
    } else {
      setMaskActive(false);
    }
  }, [menuOpen]);

  {
    menuOpen && (
      <div
        className={`drawer-mask ${maskActive ? "is-active" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    );
  }

  const setBg = (url = "/img/title-back1.webp") => {
    const el = titleImgRef.current;
    if (!el) return;
    el.style.backgroundImage = `url(${url})`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";
  };

  useEffect(() => {
    // ===== GSAP プラグイン登録 =====
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 初期背景
    setBg("/img/title-back1.webp");

    // ===== フェードイン（.scroll-move を監視）=====
    const targets = Array.from(document.querySelectorAll(".scroll-move"));
    targets.forEach((t) => t.classList.remove("show"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "-5% 0px" }
    );
    // 遅延貼り付け（元コード再現）
    const ioTimer = setTimeout(
      () => targets.forEach((t) => io.observe(t)),
      300
    );

    // ===== サイドバークリックでスムーススクロール =====
    const links = Array.from(document.querySelectorAll(".sidebar a"));
    const onClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          duration: 1,
          ease: "power2.out",
          scrollTo: { y: target, autoKill: false },
        });
      }
    };
    links.forEach((a) => a.addEventListener("click", onClick));

    // ===== ホイールでセクションにピタッと移動 =====
    const sections = gsap.utils.toArray(".section");
    let currentSection = 0;
    let isScrolling = false;

    // セクションの先頭Y座標一覧を取得
    const getTops = () =>
      sections.map((s) => s.getBoundingClientRect().top + window.scrollY);

    // 現在のスクロール位置から最寄りセクションindexに合わせる
    const updateCurrentByScroll = () => {
      const y = window.scrollY + 1; // 境界誤差吸収
      const tops = getTops();
      let idx = 0;
      for (let i = 0; i < tops.length; i++) {
        if (y >= tops[i]) idx = i;
        else break;
      }
      currentSection = idx;
    };

    updateCurrentByScroll();
    const onResize = () => setTimeout(updateCurrentByScroll, 50);

    // 簡易スロットル（200msに一回だけ反映）
    let scrollLock = false;
    const onScrollSync = () => {
      if (scrollLock) return;
      scrollLock = true;
      updateCurrentByScroll();
      setTimeout(() => {
        scrollLock = false;
      }, 200);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScrollSync);

    const wheelEnabled = () => window.innerWidth >= 1024;

    const onWheel = (event) => {
      if (!wheelEnabled()) return;
      if (isScrolling) return;
      if (Math.abs(event.deltaY) < 5) return; // 微小スクロール無視
      event.preventDefault();
      isScrolling = true;

      currentSection =
        event.deltaY > 0
          ? Math.min(currentSection + 1, sections.length - 1)
          : Math.max(currentSection - 1, 0);

      gsap.to(window, {
        duration: 1,
        ease: "power2.out",
        scrollTo: { y: sections[currentSection], autoKill: false },
        onComplete: () => {
          isScrolling = false;
        },
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    // ====== クリーンアップ（cleanupFnsは使わない） ======
    return () => {
      clearTimeout(ioTimer);
      io.disconnect();
      links.forEach((a) => a.removeEventListener("click", onClick));
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScrollSync);
    };
  }, []);

  return (
    <div className="wrapper">
      {/* マスク（開いてる時だけ表示、タップで閉じる） */}
      {menuOpen && (
        <div className="drawer-mask" onClick={() => setMenuOpen(false)} />
      )}
      {/* ハンバーガー */}
      <button
        className={`hamburger ${menuOpen ? "is-open" : ""}`}
        onClick={() => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
        aria-label="メニュー"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`sidebar scroll-move ${menuOpen ? "open" : ""}`}>
        <nav>
          <ul>
            {["home", "web", "graphic", "about"].map((id, i) => (
              <li key={i} data-text={id.toUpperCase()} className="menu-item">
                <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                  {id.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="contents-wrapper" id="home">
        <section className="section">
          <div className="top__title">
            <div
              ref={titleImgRef}
              className="top__title--img scroll-move"
            ></div>
          </div>
          <div className="top__contents">
            <div className="top__contents--title">
              Interactive Design Playground
            </div>
            <div className="top__contents--text">
              <p>This is my playground where design meets interaction.</p>
              <p>Exploring creativity through code, motion, and imagination.</p>
            </div>
          </div>
        </section>

        <section className="section" id="web">
          <div className="section--title">Web Design</div>
          <div className="section__slider scroll-move">
            <WebSlider />
          </div>
        </section>

        <section className="section" id="graphic">
          <div className="section--title">Graphic Design</div>
          <div className="section__slider scroll-move">
            <GraphicSlider />
          </div>
        </section>

        <section className="section" id="about">
          <div className="section--title">About Me</div>
          <div className="section__slider scroll-move">
            <AboutSlider />
          </div>
        </section>
      </main>

      <footer>
        <div className="copyright">2025 ©IIKAI</div>
      </footer>
    </div>
  );
}
