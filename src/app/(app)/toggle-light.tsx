"use client";
import { Toggle } from "@/components/ui/toggle";
import { MdLightMode } from "react-icons/md";

export default function ToggleLight() {
  return (
    <Toggle
      className="cursor-pointer"
      onPressedChange={(pressed) => {
        if (pressed) {
          document.body.classList.remove("dark");
        } else {
          document.body.classList.add("dark");
        }
      }}
    >
      <span className="text-xs">
        <MdLightMode />
      </span>
    </Toggle>
  );
}
