import { SystemSettings } from "@/types/system-settings.type";
import { Store } from "@tauri-apps/plugin-store";
import { CLIPPBOARD_KEY } from "../constants/constant";

// Use Store.load to get a Store instance
let store: Store | null = null;

export async function getStoreInstance() {
  if (!store) {
    store = await Store.load(CLIPPBOARD_KEY.FILE);
  }

  return store;
}

export async function saveSettings(settings:SystemSettings){

  try{
    const s= await getStoreInstance();
    await s.set(CLIPPBOARD_KEY.SETTINGS,settings);
    await s.save();
  }catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }

}

export async function getSettings():Promise<SystemSettings | null>{

  try{
    const s= await getStoreInstance();
    const settings= await s.get<SystemSettings>(CLIPPBOARD_KEY.SETTINGS);
    return settings || null;
  }catch (error) {
    console.error("Error getting settings:", error);
    throw error;
  }

}

