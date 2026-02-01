# Installation & Run

## Local development

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Application will be available at:
http://localhost:3000

---

## Docker

Build Docker image:
```bash
docker build -t next-app .
```

Run Docker container:
```bash
docker run -p 3000:3000 next-app
```

Application will be available at:
http://localhost:3000

---

## Production build (without Docker)

```bash
npm run build
npm start
```
