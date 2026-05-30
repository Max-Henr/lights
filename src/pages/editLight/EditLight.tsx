import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { colorPresets } from "../../data/ColorPresets";
import { RgbColorPicker } from "react-colorful";
import { useLights } from "../../context/LightContext";
import "./EditLight.css";

export default function EditLight() {
  const { name } = useParams<{ name: string }>();
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 });
  const { lights } = useLights();
  const [brightness, setBrightness] = useState(100);
  const decodedName = useMemo(() => {
    if (!name) {
      return "";
    }

    try {
      return decodeURIComponent(name);
    } catch {
      return name;
    }
  }, [name]);
  const selectedLight = lights.find((light) => light.name === decodedName);
  async function sendColorToLight(newColor: {
    r: number;
    g: number;
    b: number;
  }) {
    if (!selectedLight) return;

    await fetch(`http://${selectedLight.ip}/json/state`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seg: {
          col: [[newColor.r, newColor.g, newColor.b]],
        },
      }),
    });
  }

  async function sendBrightnessToLight(value: number) {
    if (!selectedLight) return;

    const wledBrightness = Math.round((value / 100) * 255);

    await fetch(`http://${selectedLight.ip}/json/state`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bri: wledBrightness,
      }),
    });
  }

  return (
    <div className="edit-light">
      <h1>{decodedName || "Edit Light"}</h1>
      <div className="edit-light-top">
        <p>QUICKSELECT</p>
        <div className="color-options">
          {colorPresets.map((preset) => (
            <div
              key={preset.name}
              className="color-option"
              onClick={() => {
                const newColor = {
                  r: preset.color[0],
                  g: preset.color[1],
                  b: preset.color[2],
                };
                setColor(newColor);
                sendColorToLight(newColor);
              }}
              style={{
                backgroundColor: `rgb(${preset.color.join(",")})`,
                width: "39px",
                height: "39px",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
      </div>
      <div
        className="color-picker-display"
        style={{
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        }}></div>
      <RgbColorPicker
        className="color-picker"
        color={color}
        onChange={(newColor) => {
          setColor(newColor);
          sendColorToLight(newColor);
        }}
      />
      <label htmlFor="brightness">Brightness: {brightness}%</label>
      <input
        type="range"
        min="0"
        max="100"
        value={brightness}
        className="brightness-slider"
        onChange={(e) => {
          const newBrightness = Number(e.target.value);
          setBrightness(newBrightness);
          sendBrightnessToLight(newBrightness);
        }}
      />
    </div>
  );
}
