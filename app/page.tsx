"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  CONFIG,
  QUESTIONS,
  MAX_SCORE,
  getLevel,
  fill,
} from "./data";

type Stage = "start" | "quiz" | "result";

export default function Home() {
  const [stage, setStage] = useState<Stage>("start");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const [busy, setBusy] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const total = QUESTIONS.length;
  const score = answers.reduce(
    (sum, a, i) => sum + (a >= 0 ? QUESTIONS[i].options[a].points : 0),
    0
  );
  const level = getLevel(score);
  const percent = Math.round((score / MAX_SCORE) * 100);

  function notify(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2500);
  }

  function start() {
    setAnswers([]);
    setIndex(0);
    setShowReview(false);
    setStage("quiz");
    window.scrollTo({ top: 0 });
  }

  function choose(optionIndex: number) {
    const next = [...answers];
    next[index] = optionIndex;
    setAnswers(next);
    if (index + 1 >= total) {
      setStage("result");
    } else {
      setIndex(index + 1);
    }
    window.scrollTo({ top: 0 });
  }

  function back() {
    if (index > 0) setIndex(index - 1);
    else setStage("start");
  }

  function shareText() {
    return `${CONFIG.quizTitle}: ${CONFIG.fandomName}\nฉันได้ระดับ ${level.emoji} ${level.title}\nคะแนน ${score}/${MAX_SCORE} (${percent}%)\nมาลองทดสอบความติ่ง ${CONFIG.artistName} กัน!\n${
      typeof window !== "undefined" ? window.location.href : ""
    }`;
  }

  async function copyResult() {
    const text = shareText();
    try {
      await navigator.clipboard.writeText(text);
      notify("คัดลอกผลแล้ว นำไปโพสต์ได้เลย ✨");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        notify("คัดลอกผลแล้ว นำไปโพสต์ได้เลย ✨");
      } catch {
        notify("คัดลอกไม่สำเร็จ ลองก๊อปปี้เองนะ");
      }
      document.body.removeChild(ta);
    }
  }

  async function saveImage() {
    if (!cardRef.current || busy) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#fff9f2",
      });
      const a = document.createElement("a");
      a.download = "fan-quiz-result.png";
      a.href = dataUrl;
      a.click();
      notify("บันทึกภาพแล้ว 📸");
    } catch {
      notify("บันทึกภาพไม่สำเร็จ ลองแคปหน้าจอแทนนะ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 py-6 sm:py-10">
      {/* ---------- START ---------- */}
      {stage === "start" && (
        <section className="pop flex flex-1 flex-col justify-center gap-6 text-center">
          <div className="wiggle mx-auto text-7xl sm:text-8xl">🎤</div>
          <div className="fun-shadow rounded-3xl border-4 border-[#24143b] bg-yellow-300 p-6">
            <p className="text-sm font-bold uppercase tracking-widest">
              {CONFIG.fandomName}
            </p>
            <h1 className="mt-2 text-5xl font-black leading-tight sm:text-6xl">
              {CONFIG.quizTitle}
            </h1>
            <p className="mt-3 text-xl font-bold">{CONFIG.tagline}</p>
          </div>
          <p className="text-base font-medium">
            ตอบ {total} ข้อ ลุ้นดูว่าคุณคือแฟนคลับของ{" "}
            <b>{CONFIG.artistName}</b> ระดับไหน
            <br />
            มี 5 ระดับ ตั้งแต่ล่องหนยันหลุดโลก 🚀
          </p>
          <button
            onClick={start}
            className="fun-shadow choice rounded-2xl border-4 border-[#24143b] bg-pink-400 px-6 py-4 text-xl font-black"
          >
            {CONFIG.startButton} 🔥
          </button>
        </section>
      )}

      {/* ---------- QUIZ ---------- */}
      {stage === "quiz" && (
        <section className="flex flex-1 flex-col gap-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-bold">
              <span>
                ข้อ {index + 1} / {total}
              </span>
              <span>{CONFIG.fandomName}</span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full border-4 border-[#24143b] bg-white">
              <div
                className="h-full bg-pink-400 transition-all duration-300"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          <div
            key={index}
            className="pop fun-shadow rounded-3xl border-4 border-[#24143b] bg-cyan-200 p-5"
          >
            <h2 className="text-2xl font-black leading-snug">
              {fill(QUESTIONS[index].q)}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {QUESTIONS[index].options.map((opt, i) => {
              const selected = answers[index] === i;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className={`choice fun-shadow-sm rounded-2xl border-4 border-[#24143b] px-4 py-3 text-left text-base font-bold ${
                    selected ? "bg-lime-300" : "bg-white"
                  }`}
                >
                  <span className="mr-2 inline-block rounded-lg bg-[#24143b] px-2 text-white">
                    {["A", "B", "C", "D"][i]}
                  </span>
                  {fill(opt.text)}
                </button>
              );
            })}
          </div>

          <button
            onClick={back}
            className="mt-auto self-start rounded-xl border-4 border-[#24143b] bg-white px-4 py-2 font-bold"
          >
            ← ย้อนกลับ
          </button>
        </section>
      )}

      {/* ---------- RESULT ---------- */}
      {stage === "result" && (
        <section className="flex flex-col gap-5">
          <div
            ref={cardRef}
            className={`pop fun-shadow rounded-3xl border-4 border-[#24143b] p-6 text-center ${level.bg}`}
          >
            <p className="text-sm font-bold uppercase tracking-widest">
              {CONFIG.quizTitle} · {CONFIG.fandomName}
            </p>
            <div className="my-3 text-7xl">{level.emoji}</div>
            <p className="text-sm font-bold">ระดับความติ่งของคุณคือ</p>
            <h2 className="mt-1 text-4xl font-black leading-tight">
              {level.title}
            </h2>
            <div className="mx-auto mt-4 w-fit rounded-2xl border-4 border-[#24143b] bg-white px-5 py-2 text-[#24143b]">
              <span className="text-4xl font-black">{score}</span>
              <span className="text-lg font-bold"> / {MAX_SCORE} คะแนน</span>
            </div>
            <p className="mt-4 text-base font-semibold leading-relaxed">
              {level.desc}
            </p>
            <p className="mt-4 text-xs font-bold opacity-80">
              แฟนคลับของ {CONFIG.artistName}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={copyResult}
              className="choice fun-shadow-sm rounded-2xl border-4 border-[#24143b] bg-white px-4 py-3 font-black"
            >
              📋 คัดลอกผล
            </button>
            <button
              onClick={saveImage}
              disabled={busy}
              className="choice fun-shadow-sm rounded-2xl border-4 border-[#24143b] bg-white px-4 py-3 font-black disabled:opacity-60"
            >
              {busy ? "กำลังบันทึก..." : "📸 บันทึกเป็นภาพ"}
            </button>
            <button
              onClick={() => setShowReview((v) => !v)}
              className="choice fun-shadow-sm rounded-2xl border-4 border-[#24143b] bg-cyan-200 px-4 py-3 font-black"
            >
              {showReview ? "ซ่อนเฉลย" : "👀 ดูเฉลยรายข้อ"}
            </button>
            <button
              onClick={start}
              className="choice fun-shadow-sm rounded-2xl border-4 border-[#24143b] bg-pink-400 px-4 py-3 font-black"
            >
              🔁 เล่นใหม่
            </button>
          </div>

          {showReview && (
            <div className="pop flex flex-col gap-3">
              <h3 className="text-xl font-black">เฉลยรายข้อ</h3>
              {QUESTIONS.map((q, i) => {
                const a = answers[i];
                const opt = a >= 0 ? q.options[a] : null;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border-4 border-[#24143b] bg-white p-4"
                  >
                    <p className="text-sm font-bold opacity-70">ข้อ {i + 1}</p>
                    <p className="font-black">{fill(q.q)}</p>
                    {opt && (
                      <>
                        <p className="mt-2 font-semibold">
                          คุณตอบ: {fill(opt.text)}
                        </p>
                        <p className="mt-1 inline-block rounded-lg bg-yellow-300 px-2 py-1 text-sm font-bold">
                          +{opt.points} · {opt.roast}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {toast && (
        <div className="pop fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl border-4 border-[#24143b] bg-lime-300 px-5 py-3 text-center font-black fun-shadow-sm">
          {toast}
        </div>
      )}
    </main>
  );
}
