export function addTokenAndPseudoToLocalStorage(token: string, pseudo: string) {
  localStorage.setItem('jwt', token);
  localStorage.setItem('pseudo', pseudo);
}

export function getTokenAndPseudoFromLocalStorage() {
  const jwt = localStorage.getItem('jwt');
  const pseudo = localStorage.getItem('pseudo');

  return { jwt, pseudo };
}
