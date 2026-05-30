import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLights } from "../../context/LightContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { lights } = useLights();
  const navigate = useNavigate();
  const [activeLights, setActiveLights] = useState<Record<string, boolean>>({});

  function toggleLight(id: string) {
    setActiveLights((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="dashboard">
      {lights.map((light) => (
        <div
          key={light.id}
          className="dashboard-device-item"
          role="button"
          tabIndex={0}
          onClick={() =>
            navigate(
              `/edit-light/${light.id}/${encodeURIComponent(light.name)}`,
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate(
                `/edit-light/${light.id}/${encodeURIComponent(light.name)}`,
              );
            }
          }}>
          <div className="dashboard-device-header">
            <div>
              <p className="dashboard-device-wled">WLED-enhet</p>
              <h2 className="dashboard-device-name">{light.name}</h2>
            </div>
            <div
              className={`dashboard-device-status ${
                activeLights[light.id] ? "is-on" : "is-off"
              }`}>
              <span className="dashboard-device-status-dot" />
              {activeLights[light.id] ? "on" : "off"}
            </div>
          </div>

          <div className="dashboard-device-color" />

          <div className="dashboard-device-toggle">
            <button
              type="button"
              className={`dashboard-device-toggle-btn ${
                activeLights[light.id] ? "is-on" : "is-off"
              }`}
              aria-pressed={activeLights[light.id] ?? false}
              onClick={(e) => {
                e.stopPropagation();
                toggleLight(light.id);
              }}>
              <span className="dashboard-device-toggle-track">
                <span className="dashboard-device-toggle-thumb" />
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
