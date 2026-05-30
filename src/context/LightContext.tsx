// context/LightsContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Light } from "../types/Light";

interface LightsContextType {
  lights: Light[];
  addLight: (light: Light) => void;
  removeLight: (id: string) => void;
}

const LightsContext = createContext<LightsContextType | null>(null);

export function LightsProvider({ children }: { children: ReactNode }) {
  const [lights, setLights] = useState<Light[]>(() => {
    const saved = localStorage.getItem("lights");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lights", JSON.stringify(lights));
  }, [lights]);

  function addLight(light: Light) {
    setLights((prev) => [...prev, light]);
  }

  function removeLight(id: string) {
    setLights((prev) => prev.filter((light) => light.id !== id));
  }

  return (
    <LightsContext.Provider
      value={{
        lights,
        addLight,
        removeLight,
      }}>
      {children}
    </LightsContext.Provider>
  );
}

export function useLights() {
  const context = useContext(LightsContext);

  if (!context) {
    throw new Error("useLights must be used inside LightsProvider");
  }

  return context;
}
