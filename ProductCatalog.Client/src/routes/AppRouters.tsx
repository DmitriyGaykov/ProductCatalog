import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {AuthPage, CatalogPage} from "../pages";
import {useCurrentUser} from "../store";
import {useStartAuth} from "../hooks";
import {LoadingPage} from "../pages/LoadingPage.tsx";

export const AppRouters: FC = () => {
  const currentUser = useCurrentUser()

  const {isLoading} = useStartAuth();

  return (
    <Routes>
      {
        isLoading ?
          <Route index path="*" element={<LoadingPage/>}/>
          :
          <>
            {
              !currentUser ?
                <>
                  <Route index path="*" element={<AuthPage/>}/>
                </> :
                <>
                  <Route index path="*" element={<CatalogPage/>}/>
                </>
            }
          </>
      }
    </Routes>
  )
}