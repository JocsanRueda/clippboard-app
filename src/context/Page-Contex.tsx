import { PAGES } from "@/utils/constant";
import React, { createContext, useState,useMemo, useCallback, useContext } from "react";

type PageContextValue={
  currentPage:string | null,
  lastPage:(string | null)[],
  // eslint-disable-next-line no-unused-vars
  handlePage:( page:string)=>void;
  goBack:()=>void;
}

const PageContext= createContext<PageContextValue | null>({
  currentPage:PAGES.SETTINGS,
  lastPage:[],
  handlePage:()=>{},
  goBack:()=>{}
});

export const PageProvider: React.FC<{children: React.ReactNode}> = ({ children }) =>{

  const  [currentPage, setCurrentPage]= useState<string | null>(PAGES.SETTINGS);
  const  [lastPage, setLastPage]= useState<(string | null)[]>([]);

  const handlePage= useCallback( (page:string)=>{

    setLastPage(prevLast=>[...prevLast, currentPage]);
    setCurrentPage(page);

  }, [currentPage]);

  const goBack=useCallback(()=>{

    setLastPage(prevLast=>{

      if( prevLast.length ===0 ) return prevLast;
      const previous= prevLast[prevLast.length -1];
      setCurrentPage(previous);
      return prevLast.slice(0, -1);

    });
  },[]);

  const value = useMemo(
    () => ({ currentPage, lastPage, handlePage, goBack }),
    [currentPage, lastPage, handlePage, goBack]
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;

};

export function usePageContext() {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePageContext must be used within PageProvider");
  return ctx;
}
