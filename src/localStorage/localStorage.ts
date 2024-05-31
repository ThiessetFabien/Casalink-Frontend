export function addTokenAndPseudoToLocalStorage(token: string) {
  localStorage.setItem('jwt', token);
}

export function getTokenAndPseudoFromLocalStorage() {
  const jwt = localStorage.getItem('jwt');

  return { jwt };
}
