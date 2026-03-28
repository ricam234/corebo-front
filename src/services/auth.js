export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getToken = () => {
  return localStorage.getItem("token");
};