let db;

let game;

// Create a new db request for a "game" database.
const request = window.indexedDB.open("game", 1);

request.onupgradeneeded = function (e) {
  console.log("Upgrade needed in IndexDB");

  const { oldVersion } = e;
  const newVersion = e.newVersion || db.version;

  console.log(`DB Updated from version ${oldVersion} to ${newVersion}`);

  db = e.target.result;

  if (db.objectStoreNames.length === 0) {
    db.createObjectStore("gameStore", { autoIncrement: true });
  }
};

request.onerror = function (e) {
  console.log(`Woops! ${e.target.errorCode}`);
};

function checkDatabase() {
  console.log("check db invoked");

  console.log(db);

  // Open a score on your gameStore db
  let score = db.score(["gameStore"], "readwrite");

  // access your gameStore object
  const store = score.objectStore("gameStore");

  // Get all records from store and set to a variable
  const getAll = store.getAll();

  // If the request was successful
  getAll.onsuccess = function () {
    // If there are items in the store, we need to bulk add them when we are back online
    if (getAll.result.length > 0) {
      fetch("/api/score/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          // If our returned response is not empty
          if (res.length !== 0) {
            // Open another score to gameStore with the ability to read and write
            score = db.score(["gameStore"], "readwrite");

            // Assign the current store to a variable
            const currentStore = score.objectStore("gameStore");

            // Clear existing entries because our bulk add was successful
            currentStore.clear();
            console.log("Clearing store 🧹");
          }
        });
    }
  };
}

request.onsuccess = function (e) {
  console.log("success");
  db = e.target.result;

  // Check if app is online before reading from db
  if (navigator.onLine) {
    console.log("Backend online! 🗄️");
    checkDatabase();
  }
};

const saveRecord = (record) => {
  console.log("Save record invoked");
  // Create a score on the gameStore db with readwrite access
  const score = db.score(["gameStore"], "readwrite");

  // Access your gameStore object store
  const store = score.objectStore("gameStore");

  // Add record to your store with add method.
  store.add(record);
};

// Listen for app coming back online
window.addEventListener("online", checkDatabase);
