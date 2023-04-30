import useAuthStore from "./store/authStore";

export default async function Logout() {
  const changeRoleToGuest = useAuthStore((state) => state.changeRoleToGuest);
  try {
    changeRoleToGuest();
  } catch (err) {
    console.log(err);
  }
}
