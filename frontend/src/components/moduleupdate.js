
const moduleUpdate = async (link) => {
    const data = {
      username: sessionStorage.getItem("username")
    };
    try {
      const jwt = localStorage.getItem("token");
      const add = await fetch(link, {
        method: "POST",
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify(data),
      });
      const adddata = await add.json();
      if (add.status !== 200) {
        console.log(adddata);
      }
    } catch (err) {
      console.log("Error");
      console.log(err);
      console.error()
    }
  };

export default moduleUpdate;