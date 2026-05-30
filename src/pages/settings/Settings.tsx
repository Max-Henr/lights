import { useState } from "react";
import { Plus } from "lucide-react";
import AddDevice from "../../components/addDevice/AddDevice";
import "./Settings.css";
import { useLights } from "../../context/LightContext";

export default function Settings() {
  const { lights, removeLight } = useLights();


  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  const handleAddDevice = () => {
    setIsAddDeviceOpen(true);
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <button className="add-device-btn" onClick={handleAddDevice}>
        Add Device <Plus />
      </button>

      {isAddDeviceOpen ? (
        <div
          className="add-device-overlay"
          onClick={() => setIsAddDeviceOpen(false)}>
          <div
            className="add-device-modal"
            onClick={(e) => e.stopPropagation()}>
            <AddDevice onClose={() => setIsAddDeviceOpen(false)} />
          </div>
        </div>
      ) : null}
      <div className="remove-device">
        {lights.map((light) => (
          <div key={light.id} className="device-item">
            <span>{light.name}</span>
            <button
              className="remove-device-btn"
              onClick={() => removeLight(light.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
