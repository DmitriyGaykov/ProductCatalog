import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {AuthPage, CatalogPage, LoadingPage, UsersPage} from "../pages";
import {useCurrentUser} from "../store";
import {useStartAuth} from "../hooks";

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
                  <Route index path="/products" element={<CatalogPage/>}/>
                  <Route path="/users" element={<UsersPage />}/>
                  <Route index path="*" element={<CatalogPage/>}/>
                </>
            }
          </>
      }
    </Routes>
  )
}