import { SystemSettings } from "@/types/system-settings.type";
import { Store } from "@tauri-apps/plugin-store";
import { CLIPBOARD_KEY, DEFAULT_THEME_INDEX } from "../constants/constant";
import { ItemClipboard } from "@/types/item-clipboard.type";

// Use Store.load to get a Store instance
let stores : Record<string, Store> = {};

export async function getStoreInstance(KEY:string) {
  if (!stores[KEY]) {
    stores[KEY] = await Store.load(KEY);
  }

  return stores[KEY];
}

//store function for history items

export async function getHistoryItems(){
  try{
    const s = await getStoreInstance(CLIPBOARD_KEY.FILE_HISTORY);

    const items = await s.get<ItemClipboard[]>(CLIPBOARD_KEY.HISTORY) ;
    return items || [];
  }catch (error) {
    console.error("Error getting history items:", error);
    throw error;
  }
}
// store function for settings
export async function saveSettings(settings:SystemSettings){

  try{
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_SETTINGS);
    await s.set(CLIPBOARD_KEY.SETTINGS,settings);
    await s.save();
  }catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }

}

export async function getSettings():Promise<SystemSettings | null>{

  try{
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_SETTINGS);
    const settings= await s.get<SystemSettings>(CLIPBOARD_KEY.SETTINGS);
    return settings || null;
  }catch (error) {
    console.error("Error getting settings:", error);
    throw error;
  }

}

// store function for theme index

export async function getThemeIndex():Promise<number>{

  try{
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_SETTINGS);
    const index= await s.get<number>(CLIPBOARD_KEY.THEME);
    return index || DEFAULT_THEME_INDEX;
  }catch (error) {
    console.error("Error getting theme index:", error);
    throw error;
  }

}

export async function saveThemeIndex(index:number){

  try{
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_SETTINGS);
    await s.set(CLIPBOARD_KEY.THEME,index);
    await s.save();
  }catch (error) {
    console.error("Error saving theme index:", error);
    throw error;
  }

}

