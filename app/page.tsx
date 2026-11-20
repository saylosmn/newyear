"use client";

import { useState, type FormEvent } from "react";
import { CalendarDays, Check, ChevronDown, MapPin, Network, PartyPopper, Users, Wifi } from "lucide-react";
import "./new-year.css";

export default function NewYearPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [votes, setVotes] = useState<string[]>([]);
  const toggleVote = (v: string) => setVotes((old) => old.includes(v) ? old.filter(x => x !== v) : [...old, v]);
  async function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setSubmitError("");
    const values = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          feedback: values.get("feedback"),
          votes,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Илгээж чадсангүй. Дахин оролдоно уу.");
      setSent(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Илгээж чадсангүй. Дахин оролдоно уу.");
    } finally {
      setSending(false);
    }
  }
  return <main className="ny-page">
    <nav className="ny-nav"><a className="ny-brand" href="#top"><span className="ny-logo"><Network size={19}/></span> NET<span className="ny-brand-dot">WORK</span><small> · МКУТИС</small></a><div className="ny-links"><a href="#event">Арга хэмжээ</a><a href="#poll">Санал хураалт</a><a href="#register">Бүртгүүлэх</a></div><a className="ny-nav-cta" href="#register">Оролцох <span>↗</span></a></nav>
    <section className="ny-hero" id="top"><div className="ny-grid"/><div className="ny-orb orb-one"/><div className="ny-orb orb-two"/><div className="ny-hero-content"><div className="ny-kicker"><span className="ny-live"/> 2026 · КОМПЬЮТЕР СҮЛЖЭЭ</div><h1>Нэг анги.<br/><em>Нэг сүлжээ.</em><br/>Нэг шинэ жил.</h1><p>Он солигдох мөчийг ангийнхантайгаа хамт угтъя. Найзуудаа бүртгүүлээд, баярын төлөвлөгөөгөө хамт сонгоорой.</p><div className="ny-hero-actions"><a className="ny-button" href="#register">Бүртгүүлэх <span>→</span></a><a className="ny-text-link" href="#event">Дэлгэрэнгүй <ChevronDown size={15}/></a></div><div className="ny-hero-meta"><span><CalendarDays size={15}/> 12 сарын 20 · 18:00</span><span><MapPin size={15}/> Улаанбаатар</span></div></div><div className="ny-hero-art"><div className="ny-orbit orbit-a"/><div className="ny-orbit orbit-b"/><div className="ny-core"><Wifi size={47}/><span>CONNECTED</span></div><div className="ny-node node-a">01 <small>БИД</small></div><div className="ny-node node-b">02 <small>НЭГДЭЕ</small></div><div className="ny-node node-c">03 <small>БАЯРЛАЯ</small></div><div className="ny-art-caption">CLASS OF <b>2026</b></div></div><div className="ny-scroll">SCROLL TO CONNECT <span>↓</span></div></section>
    <section className="ny-stats"><div><b>01</b><span>Нэг анги</span></div><div><b>∞</b><span>Дурсамж</span></div><div><b>2026</b><span>Шинэ эхлэл</span></div><div className="ny-stat-note"><PartyPopper size={17}/> Баярын хөтөлбөрийг хамтдаа сонгоно</div></section>
    <section className="ny-event" id="event"><div className="ny-section-label">01 / АРГА ХЭМЖЭЭ</div><div className="ny-event-layout"><div><h2>Сүлжээний<br/><em>хамгийн гоё</em><br/>үдэш.</h2><p className="ny-event-copy">Шалгалтын дараах амралт, ангийнхантайгаа нэг дор цуглах шалтгаан. Өдрийн хөтөлбөр болон байршлыг санал хураалтаар шийднэ.</p><a className="ny-inline-link" href="#poll">Санал өгөх <span>↗</span></a></div><div className="ny-event-card"><div className="ny-card-top"><span>EVENT NODE / 01</span><span className="ny-card-dot"/></div><div className="ny-card-icon"><Users size={24}/></div><h3>Бүгд холбогдлоо</h3><p>Ангийн шинэ жилийн уулзалтад нэгдэхэд ганцхан бүртгэл.</p><div className="ny-card-info"><span><CalendarDays size={15}/> 12.20 · 18:00 цагаас</span><span><MapPin size={15}/> Байршлыг хамт сонгоно</span></div><div className="ny-card-bottom"><span>NETWORK STATUS</span><b><i/> OPEN FOR REGISTRATION</b></div></div></div></section>
    <section className="ny-poll" id="poll"><div className="ny-poll-head"><div><div className="ny-section-label">02 / АНГИЙН САНАЛ</div><h2>Хаана <em>уулзах вэ?</em></h2></div><p>Таалагдсан сонголтуудаа тэмдэглээрэй.<br/>Эцсийн шийдвэрийг ангийн саналаар гаргана.</p></div><div className="ny-options">{["Ресторан · тухтай оройн зоог","Караоке · дуу хөгжим, бүжиг","Амралтын газар · бүтэн өдрийн хөтөлбөр"].map((o,i)=><button key={o} className={`ny-option ${votes.includes(o)?"selected":""}`} onClick={()=>toggleVote(o)}><span className="ny-option-num">0{i+1}</span><span className="ny-option-text">{o}</span><span className="ny-check">{votes.includes(o)&&<Check size={16}/>}</span></button>)}</div><div className="ny-vote-footer"><span>{votes.length ? `${votes.length} сонголт тэмдэглэлээ` : "Олон сонголт тэмдэглэж болно"}</span><span>САНАЛ ХУРААЛТ · НЭЭЛТТЭЙ</span></div></section>
    <section className="ny-register" id="register"><div className="ny-register-glow"/><div className="ny-register-copy"><div className="ny-section-label">03 / БҮРТГЭЛ</div><h2>Чи ирэх үү?<br/><em>Сүлжээнд нэгд.</em></h2><p>Бүртгүүлээд баярын мэдээллээ аваарай. Санал хүсэлтээ ч бас үлдээж болно.</p><div className="ny-register-note"><Network size={19}/><span><b>Төгсгөлийн цэг: шинэ дурсамж</b><small>Таны мэдээллийг зөвхөн арга хэмжээний зохион байгуулалтад ашиглана.</small></span></div></div><form className="ny-form" onSubmit={submitRegistration}><div className="ny-form-heading"><span>PARTICIPANT / 2026</span><span><i/> FORM OPEN</span></div>{sent?<div className="ny-success"><div><Check size={23}/></div><h3>Бүртгэл амжилттай!</h3><p>Шинэ жилийн сүлжээнд нэгдлээ. Удахгүй уулзъя!</p><button type="button" onClick={()=>setSent(false)}>Дахин бүртгүүлэх</button></div>:<><label>Овог, нэр<input name="name" required maxLength={120} placeholder="Таны нэр"/></label><label>Санал, хүсэлт<textarea name="feedback" maxLength={2000} placeholder="Хөтөлбөр, хоол, хөгжмийн санал…" rows={3}/></label>{submitError&&<p className="ny-form-error" role="alert">{submitError}</p>}<button className="ny-submit" disabled={sending}>{sending?"Илгээж байна…":"Бүртгэл илгээх"} <span>→</span></button><small className="ny-form-disclaimer">Илгээснээр арга хэмжээний тухай мэдээлэл авахыг зөвшөөрнө.</small></>}</form></section>
    <footer className="ny-footer"><a className="ny-brand" href="#top"><span className="ny-logo"><Network size={17}/></span> NET<span className="ny-brand-dot">WORK</span></a><span>МКУТИС · КОМПЬЮТЕР СҮЛЖЭЭ · 2026</span><a href="#top">ДЭЭШ БУЦАХ ↑</a></footer>
  </main>
}

