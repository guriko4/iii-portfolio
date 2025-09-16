import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export default function App() {
  const titleImgRef = useRef(null)

  const setBg = (url = '/img/title-back1.webp') => {
    const el = titleImgRef.current
    if (!el) return
    el.style.backgroundImage = `url(${url})`
    el.style.backgroundSize = 'cover'
    el.style.backgroundPosition = 'center'
    el.style.backgroundRepeat = 'no-repeat'
  }

  useEffect(() => {

    // ===== GSAP プラグイン登録 =====
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

        // 初期背景
    setBg('/img/title-back1.webp')

        // ===== フェードイン（.scroll-move を監視）=====
    const targets = Array.from(document.querySelectorAll('.scroll-move'))
    targets.forEach(t => t.classList.remove('show'))

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('show', entry.isIntersecting)
      })
    }, { threshold: 0, rootMargin: '-5% 0px' })
    // 遅延貼り付け（元コード再現）
    const ioTimer = setTimeout(() => targets.forEach(t => io.observe(t)), 300)

        // ===== サイドバークリックでスムーススクロール =====
    const links = Array.from(document.querySelectorAll('.sidebar a'))
    const onClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (!href?.startsWith('#')) return
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        gsap.to(window, {
          duration: 1,
          ease: 'power2.out',
          scrollTo: { y: target, autoKill: false },
        })
      }
    }
    links.forEach(a => a.addEventListener('click', onClick))

        // ===== ホイールでセクションにピタッと移動 =====
    const sections = gsap.utils.toArray('.section')
    let currentSection = 0
    let isScrolling = false

    // モバイルは無効化（酔いやすいので）
    const wheelEnabled = () => window.innerWidth >= 1024

    const onWheel = (event) => {
      if (!wheelEnabled()) return
      if (Math.abs(ev.deltaY) < 5) return;
      if (isScrolling) return
      isScrolling = true
      event.preventDefault()

      if (event.deltaY > 0) {
        currentSection = Math.min(currentSection + 1, sections.length - 1)
      } else {
        currentSection = Math.max(currentSection - 1, 0)
      }

      gsap.to(window, {
        duration: 1,
        ease: 'power2.out',
        scrollTo: { y: sections[currentSection], autoKill: false },
        onComplete: () => { isScrolling = false }
      })
    }
    window.addEventListener('wheel', onWheel, { passive: false })

    // ===== クリーンアップ =====
    return () => {
      clearTimeout(ioTimer)
      io.disconnect()
      links.forEach(a => a.removeEventListener('click', onClick))
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div className="wrapper">
        <aside className="sidebar scroll-move">
            <nav>
                <ul>
                    <li
                    data-text="HOME"
                    data-bg="/img/title-back1.webp"
                    className="menu-item"
                    onMouseEnter={(e) => setBg(e.currentTarget.dataset.bg)}
                    onMouseLeave={() => setBg('/img/title-back1.webp')}
                    >
                      <a href="#home">HOME</a>
                    </li>
                    <li
                    data-text="Layouts"
                    data-bg="/img/title-back2.webp"
                    className="menu-item"
                    onMouseEnter={(e) => setBg(e.currentTarget.dataset.bg)}
                    onMouseLeave={() => setBg('/img/title-back1.webp')}
                    >
                      <a href="#layouts">Layouts</a>
                    </li>
                    <li
                    data-text="Interactions"
                    data-bg="/img/title-back3.webp"
                    className="menu-item"
                    onMouseEnter={(e) => setBg(e.currentTarget.dataset.bg)}
                    onMouseLeave={() => setBg('/img/title-back1.webp')}
                    >
                      <a href="#interactions">Interactions</a>
                    </li>
                    <li
                    data-text="Effects"
                    data-bg="/img/title-back4.webp"
                    className="menu-item"
                    onMouseEnter={(e) => setBg(e.currentTarget.dataset.bg)}
                    onMouseLeave={() => setBg('/img/title-back1.webp')}
                    ><a href="#effects">Effects</a>
                    </li>
                </ul>
            </nav>
        </aside>

        <main className="contents-wrapper" id="home">
            <section className="section">
                <div className="top__title">
                    <div ref={titleImgRef} className="top__title--img scroll-move"></div>
                </div>
                <div className="top__contents">
                    <div className="top__contents--title">Mock
                        Motion Labo
                    </div>
                    <div className="top__contents--text">
                        <p>MOCK MOTION LABO is my creative space where I bring ideas to life.</p>
                        <p>Every project is a challenge to innovate and push my skills further!</p>
                    </div>
                </div>
            </section>

            <section className="section" id="layouts">
                セクション1
            </section>

            <section className="section" id="interactions">
                セクション2
            </section>

            <section className="section" id="effects">
                セクション3
                <img src="/img/title-back1.webp" width="600" alt="" />

            </section>
        </main>

        <footer>
            <div className="copyright">2025 ©IIKAI</div>
        </footer>
    </div>
  )
}

