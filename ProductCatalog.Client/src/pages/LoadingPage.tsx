import { FC } from "react";
import {SpinnerLoader} from "../components";

export const LoadingPage: FC = () => {
  return (
    <div className="d-flex min-vw-100 min-vh-100 first-bg-color justify-content-center align-items-center">
      <SpinnerLoader />
    </div>
  );
};
