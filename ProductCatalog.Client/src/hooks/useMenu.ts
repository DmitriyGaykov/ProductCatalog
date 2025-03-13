import {useState} from "react";

export const useMenu = () : [boolean, () => void] => {
  const [showMenu, setShowMenu] = useState(false);
  return [showMenu, () => setShowMenu(!showMenu)];
}