import {useCurrentUser} from "../store";
import LogoutSvg from './../assets/svg/logout-2-svgrepo-com.svg';
import AddUserSvg from './../assets/svg/add-user-svgrepo-com.svg';
import UsersSvg from './../assets/svg/users-svgrepo-com.svg';
import CatalogSvg from './../assets/svg/shopping-catalog-svgrepo-com.svg';
import {useAuth, useMenu} from "../hooks";
import {useEffect, useState} from "react";
import {Roles} from "../models";
import {AddUserMenu} from "../features";
import {useNavigate} from "react-router-dom"; // ✅ Импорт как строка

export const Header = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const [showAddUserMenu, toggleAddUserMenu] = useMenu();

  const [role, setRole] = useState("");

  useEffect(() => {
    if (!currentUser)
      return;

    let role = ""

    switch (currentUser.role) {
      case Roles.User:
        role = 'Пользователь';
        break;
      case Roles.AdvancedUser:
        role = 'Продвинутый пользователь';
        break;
      case Roles.Admin:
        role = 'Администратор';
        break;
    }

    setRole(role)
  }, [currentUser])

  return (
    <header className="d-flex align-items-center justify-content-center min-vw-100 second-bg-color p-2 header-height">
      <div className="max-width-1500 width-1500 d-flex align-items-center justify-content-between mx-5">
        <span className="text-color text-size-1">
          Здравствуйте, {currentUser?.firstName || ""} {currentUser?.lastName || ""} ({role})
        </span>
        <div className="d-flex align-items-center gap-2">
          <img src={CatalogSvg} className="cursor-pointer" alt="Users" width={29} height={29}
               onClick={() => navigate('/catalog')}/>
          {
            currentUser!.role === Roles.Admin &&
              <>
                  <img src={AddUserSvg} className="cursor-pointer" alt="Add user" width={33} height={33}
                       onClick={toggleAddUserMenu}/>
                  <img src={UsersSvg} className="cursor-pointer" alt="Users" width={24} height={24}
                       onClick={() => navigate('/users')}/>
              </>
          }

          <img src={LogoutSvg} className="cursor-pointer" alt="Logout" width={24} height={24} onClick={logout}/>
        </div>
      </div>

      {
        showAddUserMenu &&
          <AddUserMenu onCancel={toggleAddUserMenu}/>
      }

    </header>
  );
};
