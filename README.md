# School Management System (SMS)

Sisiteme yoroshye kandi yumvikana yo gucunga ibikorwa by'ishuri byose:
- Abanyeshuri
- Amanota
- Attendance
- Amafaranga y'ishuri
- Activities (exams, clubs, sports, events)
- Raporo z'umunyeshuri

## Features z'ingenzi

- **Students:** kwandika no kureba abanyeshuri.
- **Amanota:** kwinjiza amanota ku isomo no kureba impuzandengo.
- **Attendance:** gufata present/late/absent buri munsi.
- **Amafaranga:** kwandika ubwishyu no kubara total yishyuwe.
- **Activities:** gutegura no kubika activities zose z'ishuri.
- **Raporo:** raporo ya buri munyeshuri irimo grades + attendance + payments + class activities.
- **Dashboard:** imibare y'ingenzi harimo n'iy'activities.

---

## 1) Uko wayiruninga step-by-step (Local)

### Ibisabwa
- Python 3.10+

### Steps

```bash
# 1) clone repo
git clone <REPO_URL>

# 2) injira muri project
cd new-project

# 3) reba python version
python3 --version

# 4) tangiza app
python3 app.py
```

Niba byose ari sawa urabona:

```text
SMS running on http://0.0.0.0:8000
```

Hanyuma fungura muri browser: `http://localhost:8000`

> Database ni SQLite: `data/sms.db` (ihita iremwa ubwayo).

---

## 2) Uko wapima ko ikora neza (Quick checks)

Mu terminal nshya (app ikiri running):

```bash
# health check
curl -s http://localhost:8000/api/health

# dashboard check
curl -s http://localhost:8000/api/dashboard
```

Kongeramo student:

```bash
curl -s -X POST http://localhost:8000/api/students \
  -H 'Content-Type: application/json' \
  -d '{"name":"Aline","class_name":"S3B","parent_phone":"0788000000"}'
```

Kongeramo activity:

```bash
curl -s -X POST http://localhost:8000/api/activities \
  -H 'Content-Type: application/json' \
  -d '{
    "title":"Science Fair",
    "activity_type":"Event",
    "class_name":"S3B",
    "activity_date":"2026-03-10",
    "start_time":"09:00",
    "end_time":"12:00",
    "owner_name":"Murekatete",
    "status":"planned",
    "notes":"Presentations"
  }'
```

Reba activities zose:

```bash
curl -s http://localhost:8000/api/activities
```

---

## 3) Uko coding y'iyi project iteye (kugira ngo uyisobanukirwe)

- `app.py`
  - Irimo HTTP server, API endpoints, na database logic.
  - `init_db()` irema tables zose.
  - `do_GET()` ikora fetch endpoints.
  - `do_POST()` ikora create endpoints.
- `static/index.html`
  - UI forms na tables.
- `static/app.js`
  - Guhamagara APIs no kuzuza dashboard/tables.
- `static/styles.css`
  - Styles za UI.

Niba ushaka guhindura feature, kora izi steps:
1. Hindura backend endpoint muri `app.py`.
2. Hindura form cyangwa table muri `static/index.html`.
3. Hindura API call logic muri `static/app.js`.
4. Ongeramo style muri `static/styles.css`.
5. Kora test ukoresheje `curl` mbere yo gukomita.

---

## 4) Environment variables

- `SMS_HOST` (default: `0.0.0.0`)
- `SMS_PORT` (default: `8000`)

Urugero:

```bash
SMS_HOST=0.0.0.0 SMS_PORT=9000 python3 app.py
```

---

## API endpoints

- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/students`
- `POST /api/students`
- `POST /api/grades`
- `POST /api/attendance`
- `POST /api/payments`
- `GET /api/activities`
- `POST /api/activities`
- `GET /api/reports/student/{id}`

---

## 5) Gukoresha nka Website muri Docker (Frontend + Backend)

Iyi project ifite **frontend (HTML/CSS/JS)** na **backend (Python API)** muri app imwe, kandi Docker irabikoresha byose hamwe nka website imwe.

### Option A: Docker Compose (recommended)

```bash
# 1) Build + run
docker compose up --build -d

# 2) Reba logs
docker compose logs -f

# 3) Fungura website
# http://localhost:8000

# 4) Health check
curl -s http://localhost:8000/api/health
```

Data ibikwa muri volume `sms_data` kugirango data idasibangana container yahagaze.

Guhagarika:

```bash
docker compose down
```

### Option B: Docker run (container imwe)

```bash
docker build -t sms-app .
docker run -d --name sms-app -p 8000:8000 -v sms_data:/app/data sms-app
```

Hanyuma fungura: `http://localhost:8000`

