import Axios from 'axios'


async function tokenCheck(setUserInfo) {
  try {
    let token = localStorage.getItem("token")
    if (token) {
      let user = await Axios.get("http://localhost:80/user/loginUser", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setUserInfo(user.data.user)
    }
  } catch (error) {
    console.log(error)
  }
}


export {tokenCheck}