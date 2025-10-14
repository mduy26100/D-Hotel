import React from "react";
import { Button, Result } from "antd";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Result
      status="403"
      title="403"
      subTitle={error?.statusText || error?.message || "Unknown error occurred"}
      extra={
        <Button type="primary">
          <Link to={"/dashboard"}>Back Home</Link>
        </Button>
      }
    />
  );
};

export default ErrorPage;
