import axios from "axios";

const authTest = async () => {
    // Grab token off of localstorage
    const token = window.localStorage.getItem('token');

    // Pass token over to the back-end
    const res = await axios.get("/api/auth/testAuth", {
        headers: {
            Authorization: 'Bearer ' + token
        }
      })

  if (res.status !== 200) {
    throw redirect("/login");
  }
}

export default authTest