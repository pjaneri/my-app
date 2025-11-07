(async()=>{
  try{
    const res = await fetch('http://localhost:3000/api/auth/sign-up/email',{
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email: 'test+script@example.com', password: 'password123' })
    });
    console.log('STATUS', res.status);
    const text = await res.text();
    console.log('BODY', text);
  }catch(e){
    console.error('ERROR', e);
  }
})();
