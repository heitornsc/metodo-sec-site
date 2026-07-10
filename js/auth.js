/*
  Login simples (somente no navegador) para a Área de Membros.
  IMPORTANTE: isso NÃO é segurança de verdade — qualquer pessoa que abrir o
  código-fonte consegue ver a senha. Serve só para impedir acesso casual de
  quem não é aluno. Para proteger conteúdo pago de forma robusta, use um
  serviço como Netlify Identity ou Memberstack.

  Para trocar a senha ou adicionar mais logins, edite a lista MEMBERS abaixo.
*/
const MEMBERS = [
  { user: 'aluno', pass: 'metodosec2026' },
];

function attemptLogin(user, pass) {
  const found = MEMBERS.some((m) => m.user === user && m.pass === pass);
  if (found) {
    sessionStorage.setItem('sec_member_auth', '1');
  }
  return found;
}

function isLoggedIn() {
  return sessionStorage.getItem('sec_member_auth') === '1';
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

function logout() {
  sessionStorage.removeItem('sec_member_auth');
  window.location.href = 'login.html';
}
