const toast = document.getElementById('toast');

function notify(msg, ok = true) {
  toast.style.display = 'block';
  toast.style.background = ok ? '#166534' : '#991b1b';
  toast.textContent = msg;
  setTimeout(() => (toast.style.display = 'none'), 2600);
}

async function api(url, method = 'GET', body) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ikibazo kuri server');
  return data;
}

async function loadDashboard() {
  const d = await api('/api/dashboard');
  document.getElementById('dashboard').innerHTML = `
    <div class="card"><small>Abanyeshuri</small><br><b>${d.students}</b></div>
    <div class="card"><small>Impuzandengo y'amanota</small><br><b>${d.average_grade}</b></div>
    <div class="card"><small>Abasibye</small><br><b>${d.absent_count}</b></div>
    <div class="card"><small>Amafaranga yishyuwe</small><br><b>${d.paid_total} FRW</b></div>
  `;
}

async function loadStudents() {
  const students = await api('/api/students');
  document.getElementById('studentsTable').innerHTML = students
    .map((s) => `<tr><td>${s.id}</td><td>${s.name}</td><td>${s.class_name}</td><td>${s.parent_phone || '-'}</td></tr>`)
    .join('');
}

function formToJSON(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function registerForm(id, endpoint) {
  document.getElementById(id).addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await api(endpoint, 'POST', formToJSON(e.target));
      e.target.reset();
      await Promise.all([loadDashboard(), loadStudents()]);
      notify('Byabitswe neza');
    } catch (err) {
      notify(err.message, false);
    }
  });
}

registerForm('studentForm', '/api/students');
registerForm('gradeForm', '/api/grades');
registerForm('attendanceForm', '/api/attendance');
registerForm('paymentForm', '/api/payments');

document.getElementById('reportForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const sid = new FormData(e.target).get('student_id');
  try {
    const report = await api(`/api/reports/student/${sid}`);
    document.getElementById('reportOutput').textContent = JSON.stringify(report, null, 2);
    notify('Raporo yabonetse');
  } catch (err) {
    notify(err.message, false);
  }
});

Promise.all([loadDashboard(), loadStudents()]).catch((err) => notify(err.message, false));
