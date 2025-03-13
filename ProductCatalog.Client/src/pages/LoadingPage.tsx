import { FC } from "react";

export const LoadingPage: FC = () => {
  console.log('Loading')
  return (
    <div className="d-flex min-vw-100 min-vh-100 first-bg-color justify-content-center align-items-center">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
