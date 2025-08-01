import { Store } from "@tauri-apps/plugin-store";




// Function to load the store from a file
export  async function loadStore(){

  const store = await Store.load(".clipboard.json");


  return store;
}

