"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

// Placeholder feed until the final hero posts are chosen.
const POSTS = [1, 2, 3, 4, 5].map((n) => `/images/hero/post-${String(n).padStart(2, "0")}.webp`);
const HANDLE = "sherzod.design";

/**
 * Hero: a two-line metallic headline with a phone in front of it. The phone
 * plays a social feed of the work, because most of that work lives on a
 * phone screen. Scrolling pins the hero while the phone straightens and
 * comes forward.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-line-inner", { yPercent: 105, duration: 1.4, stagger: 0.12 })
          .from(phone.current, { y: 160, rotateX: 38, opacity: 0, duration: 1.6 }, 0.35)
          .from(".hero-meta > *", { opacity: 0, y: 12, duration: 1, stagger: 0.08 }, 0.9);

        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "+=90%", scrub: 0.6, pin: true },
          })
          .to(phone.current, { scale: 1.32, rotateX: 0, rotateY: 0, rotateZ: 0, y: "-6vh", ease: "none" }, 0)
          .to(title.current, { yPercent: -18, opacity: 0.18, ease: "none" }, 0)
          .to(".hero-meta", { opacity: 0, ease: "none" }, 0);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero" aria-label="Introduction">
      <div className="hero-grid" aria-hidden="true" />

      <h1 ref={title} className="hero-title" aria-label={`${site.name}, designer`}>
        <span className="hero-line" aria-hidden="true">
          <span className="hero-line-inner">Sherzod</span>
        </span>
        <span className="hero-line hero-line-italic" aria-hidden="true">
          <span className="hero-line-inner">Designer</span>
        </span>
      </h1>

      <div className="hero-stage">
        <div ref={phone} className="phone" role="img" aria-label="Phone showing a feed of social media posts">
          <PhoneFeed />
        </div>
      </div>

      <div className="hero-meta">
        <div className="hero-meta-left">
          <span>{site.name}</span>
          <LocalTime />
        </div>
        <p className="hero-meta-right">
          Graphic designer from Tashkent. I design social media, brand identities and print for brands that want
          to be noticed.
        </p>
      </div>
    </section>
  );
}

function PhoneFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % POSTS.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="phone-body">
      <div className="phone-screen">
        <div className="phone-island" />
        <div className="feed-head">
          <span className="feed-avatar">SB</span>
          <span className="feed-handle">{HANDLE}</span>
        </div>
        <div className="feed-media">
          {POSTS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" className={i === index ? "is-current" : ""} loading={i === 0 ? "eager" : "lazy"} />
          ))}
        </div>
        <div className="feed-actions" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>
          <svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-3.1-6.3L20 4v5h-5" /></svg>
          <svg viewBox="0 0 24 24"><path d="m4 12 16-8-5 16-3-7-8-1Z" /></svg>
        </div>
        <div className="feed-lines" aria-hidden="true">
          <i />
          <i />
        </div>
        <div className="feed-dots" aria-hidden="true">
          {POSTS.map((src, i) => (
            <i key={src} className={i === index ? "is-current" : ""} />
          ))}
        </div>
      </div>
      <div className="phone-glare" />
    </div>
  );
}

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tashkent" }).format(new Date());
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 20000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span>
      UZ <span className="hero-time">{time ?? "--:--"}</span> GMT+5
    </span>
  );
}
