(async ()=>{
  const url = 'http://localhost:3000/api/auth/health';
  for (let i = 0; i < 20; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) {
        console.log('HEALTH_OK', r.status, await r.text());
        break;
      } else {
        console.log('HEALTH_STATUS', r.status);
      }
    } catch (e) {
      if (i === 19) console.error('HEALTH_ERR', e && e.message ? e.message : e);
    }
    await new Promise((res) => setTimeout(res, 1000));
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/sign-up/email', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Teste', email: 'test+cli@example.com', password: 'password123' }),
      credentials: 'include',
    });
    console.log('SIGNUP_STATUS', res.status);
    const text = await res.text();
    console.log(text);
  } catch (e) {
    console.error('SIGNUP_ERR', e && e.message ? e.message : e);
    process.exit(2);
  }
})();
