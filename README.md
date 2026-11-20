# Компьютер сүлжээ · Шинэ жил 2026

МКУТИС-ийн Компьютер сүлжээний ангийн шинэ жилийн бүртгэл, санал хураалтын сайт. Бүртгэл болон сонгосон санал Google Sheets-д хадгалагдана.

## Google Sheets холбоход

1. Шинэ Google Sheet үүсгэнэ.
2. Sheet дээрээс **Extensions → Apps Script** нээж `google-apps-script/Code.gs` доторх кодыг оруулж хадгална.
3. Apps Script-ийн **Project Settings → Script Properties** хэсэгт `NEWYEAR_FORM_SECRET` нэртэй property нэмнэ. Урт, санамсаргүй нууц утга хэрэглээд хадгална.
4. **Deploy → New deployment → Web app** сонгоно. **Execute as: Me**, **Who has access: Anyone** гэж тохируулж deploy хийнэ. Гарсан `/exec` URL-ийг хуулна.
5. Сайтын hosting-ийн server environment variables-д `GOOGLE_SHEETS_WEBHOOK_URL` (дээрх URL), `GOOGLE_SHEETS_FORM_SECRET` (3-р алхамд үүсгэсэн яг ижил утга) нэмнэ.
6. Hosting дээр шинэ deployment ажиллуулаад бүртгэлийн маягтаар туршина.

Нууц утгыг source code, browser талын код, GitHub-д бүү оруулаарай. Эхний бүртгэл Sheets-д баганын гарчиг үүсгээд, цааш бүртгэлүүдийг мөр болгон хадгална.

## Эхлүүлэх

```bash
npm install
npm run dev
```

Production build: `npm run build`
