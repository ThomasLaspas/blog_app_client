import { useNavigate } from "react-router-dom";

export async function requireAuth() {
  const storedData = localStorage.getItem("key");
  //const navigate = useNavigate();
  if (!storedData) {
    window.location.href = "/?message=You must log in first.";
  }
  return null;
}
