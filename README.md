# School Management System (SMS)

Sisiteme yuzuye yo gufasha amashuri gucunga:
- Amanota
- Attendance
- Amafaranga y'ishuri
- Raporo z'abanyeshuri

## Ikibazo gikemurwa

Amashuri menshi aracyakoresha impapuro. Iyi system ibika amakuru muri database imwe, igatanga raporo zihuse kandi zigabanya amakosa.

## Features z'ingenzi

- **Amanota:** kwinjiza amanota ku isomo no kureba impuzandengo.
- **Attendance:** gufata present/late/absent buri munsi.
- **Amafaranga:** kwandika ubwishyu no kubara amafaranga yishyuwe yose.
- **Raporo:** raporo y'umunyeshuri irimo summary + detail zose.
- **Dashboard:** imibare y'ibanze (abanyeshuri, average grade, absences, total paid).

## Pricing (Business model)

- **50,000 FRW – 300,000 FRW** one-time setup fee kuri buri shuri
- Cyangwa **monthly subscription** (bitewe n'ingano y'ishuri)

## Uko wiyambaza project

### 1) Tangiza server

```bash
python3 app.py
```

Server irahita iboneka kuri: `http://localhost:8000`

### 2) Koresha UI

- Injira abanyeshuri
- Andika amanota
- Andika attendance
- Andika ubwishyu
- Reba raporo ukoresheje Student ID

## API endpoints

- `GET /api/dashboard`
- `GET /api/students`
- `POST /api/students`
- `POST /api/grades`
- `POST /api/attendance`
- `POST /api/payments`
- `GET /api/reports/student/{id}`
