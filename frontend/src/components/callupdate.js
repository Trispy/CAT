const callUpdate = async (e) => {
    console.log("In call");
    sessionStorage.setItem(e, true);
    const data = {
        username: sessionStorage.getItem("username"),
        module: e
    };

    console.log("date modified");
    try {
        console.log("In try");
        const add = await fetch("http://localhost:3001/api/game/updateComplete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const adddata = await add.json();
        console.log(adddata);
        if (add.status !== 200) {
            console.log(add.json());
        }
    } catch (err) {
        console.log("Error");
        console.log(err);
        console.error()
    }
};

export default callUpdate;