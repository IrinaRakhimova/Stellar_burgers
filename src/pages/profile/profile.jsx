import styles from "./profile.module.css";
import { Outlet } from "react-router-dom";
import ProfileMenu from "../../components/ui/profile-menu/profile-menu";

function Profile() {
  return (
    <div className={styles.container}>
      <ProfileMenu />
      <Outlet />
    </div>
  );
}

export default Profile;
