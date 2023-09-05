import { useSelector } from "react-redux";

function Profile() {
  const loggedIn = useSelector(store=> store.login.isLoggedIn);

  return (
    <div>
      {loggedIn ? <ProfilePage/>  : <p>Login to access Profile</p>}
    </div>
  )
}

export default Profile;

function ProfilePage(){
  const userName = useSelector(store=> store.login.name)
  return (
    <div>
      <p>{userName}&apos;s Profile</p>
    </div>
  )
}

