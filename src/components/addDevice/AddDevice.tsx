import { useState } from "react";
import { useLights } from "../../context/LightContext";
import "./AddDevice.css";

type AddDeviceProps = {
  onClose: () => void;
};

export default function AddDevice({ onClose }: AddDeviceProps) {
  const { addLight } = useLights();

  const [name, setName] = useState("");
  const [ip, setIp] = useState("");

  function createDeviceId() {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
    ) {
      return crypto.randomUUID();
    }

    return `light-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addLight({
      id: createDeviceId(),
      name,
      ip,
    });
    setName("");
    setIp("");
  }
  return (
    <div className="add-device">
      <div className="add-device-header">
        <h1>Add Device</h1>
        <button className="add-device-close" type="button" onClick={onClose}>
          Close
        </button>
      </div>
      <form className="add-device-form" onSubmit={handleSubmit}>
        <label htmlFor="device-name">Device Name</label>
        <input
          type="text"
          id="device-name"
          name="device-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="device-ip">Device IP</label>
        <input
          type="text"
          id="device-ip"
          name="device-ip"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button type="submit">Add Device</button>
      </form>
    </div>
  );
}
