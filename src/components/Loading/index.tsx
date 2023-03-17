import { Spin } from "antd";

export function LoadingSpinner(): JSX.Element {
  return (
    <div className="loading-spinner">
      <Spin tip="Loading" size="large" />
    </div>
  );
}
