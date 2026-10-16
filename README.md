# FAN QUIZ — ติ่งระดับไหน?

เว็บแบบทดสอบแฟนคลับ ทำด้วย Next.js + Tailwind CSS ไม่มี Backend / Database / API key พร้อม Deploy บน Vercel

## ฟีเจอร์
- หน้าเริ่ม, หน้าแบบทดสอบ 20 ข้อ (ย้อนกลับได้), หน้าผลลัพธ์ + เฉลยรายข้อ
- คะแนน 0–60 แบ่ง 5 ระดับ
- คัดลอกผลลัพธ์ และบันทึกเป็นภาพ PNG
- รองรับมือถือ

## รันบนเครื่อง
```bash
npm install
npm run dev
```
เปิด http://localhost:3000

## แก้เป็นด้อมของคุณ
แก้ไฟล์เดียว: `app/data.ts`
- `CONFIG` — ชื่อด้อม ชื่อศิลปิน หัวข้อ
- `QUESTIONS` — คำถาม ตัวเลือก คะแนน (0–3) และข้อความแซว ใช้ `{artist}` / `{fandom}` แทนชื่อได้
- `LEVELS` — 5 ระดับ ช่วงคะแนน อีโมจิ ข้อความ สีพื้นหลัง

## Deploy
1. Push ขึ้น GitHub
2. ไปที่ https://vercel.com/new แล้ว Import repo นี้
3. กด Deploy (ไม่ต้องตั้ง Environment Variables)
