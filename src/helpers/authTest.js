import axios from "axios";
import { redirect } from "react-router-dom";

const authTest = async () => {
  try {
    // Grab token off of localstorage
    const token = window.localStorage.getItem("token");

    // Pass token over to the back-end
    const res = await axios.get("/api/auth/testAuth", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.status !== 200) {
      throw redirect("/login");
    }
    return true
  } catch (error) {
    throw redirect("/login");
  }
};

export default authTest;
