import { ItemClipboard } from "@/types/item-clipboard.type";
import { SystemSettings } from "@/types/system-settings.type";
import { ThemeFile } from "@/types/theme.type";
import { Store } from "@tauri-apps/plugin-store";
import { CLIPBOARD_KEY, DEFAULT_THEME_ID } from "../constants/constant";
import { getLocalStorageSettings, saveLocalStorageSettings } from "./localStorage";

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

    //save local storage
    saveLocalStorageSettings(settings);

  }catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }

}

export async function getSettings():Promise<SystemSettings | null>{

  try{

    //search in local storage first
    const settingsStorage= getLocalStorageSettings();
    if(settingsStorage) return settingsStorage;

    //search in store
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_SETTINGS);
    const settings= await s.get<SystemSettings>(CLIPBOARD_KEY.SETTINGS);
    return settings || null;
  }catch (error) {
    console.error("Error getting settings:", error);
    throw error;
  }

}

// store function for theme index

export async function getThemeId():Promise<string>{

  try{
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_SETTINGS);
    const id= await s.get<string>(CLIPBOARD_KEY.THEME);
    return id || DEFAULT_THEME_ID;
  }catch (error) {
    console.error("Error getting theme id:", error);
    throw error;
  }

}

export async function saveThemeId(id:string){

  try{
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_SETTINGS);
    await s.set(CLIPBOARD_KEY.THEME,id);
    await s.save();
  }catch (error) {
    console.error("Error saving theme id:", error);
    throw error;
  }

}

// store function for themes
export async function getUserThemes():Promise<ThemeFile[] >{

  try{
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_THEMES);
    const themes= await s.get<ThemeFile[]>  (CLIPBOARD_KEY.THEMES);
    return themes || [];
  }catch (error) {
    console.error("Error getting themes:", error);
    throw error;
  }
}

export async function addTheme(newTheme:ThemeFile){

  const themes= await getUserThemes();

  const newThemesList=[...themes,newTheme];

  try{
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_THEMES);
    await s.set(CLIPBOARD_KEY.THEMES,newThemesList);
    await s.save();
  }catch (error) {
    console.error("Error saving themes:", error);
    throw error;
  }
}

export async function deleteTheme(themeId:string){

  const themes= await getUserThemes();

  const newThemesList= themes.filter(t => t.id !== themeId);

  try{
    const s= await getStoreInstance(CLIPBOARD_KEY.FILE_THEMES);
    await s.set(CLIPBOARD_KEY.THEMES,newThemesList);
    await s.save();
  }catch (error) {
    console.error("Error deleting theme:", error);
    throw error;
  }
}
