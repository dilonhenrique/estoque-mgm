"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/forms/fields";
import { InputProps } from "../ui/forms/fields/Input/Input.type";

export default function PasswordInput(props: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      endContent={
        <button
          tabIndex={-1}
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <Eye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      {...props}
    />
  );
}
