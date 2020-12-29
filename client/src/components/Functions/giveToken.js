function giveToken(){
    let token = localStorage.token;
    return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
}





module.exports = giveToken