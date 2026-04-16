const API = process.env.REACT_APP_API_URL;

const moduleUpdate = async (link, refreshSummary) => {
try {
const jwt = localStorage.getItem("token");

const res = await fetch(link, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`
  }
});

const data = await res.json();

console.log("MODULE UPDATE STATUS:", res.status);
console.log("MODULE UPDATE RESPONSE:", data);

if (!res.ok) {
  console.error("Module update failed:", data);
}
if (refreshSummary) {
      await refreshSummary();
    }

} catch (err) {
console.error("Module update error:", err);
}
};

export default moduleUpdate;