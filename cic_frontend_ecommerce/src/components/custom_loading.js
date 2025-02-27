import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingOverlay = ({ loading }) => {
    if (!loading) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48, color: "#C60925" }} spin />}
            />
        </div>
    );
};
export default LoadingOverlay;
