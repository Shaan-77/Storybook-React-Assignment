import React, { useState, forwardRef } from "react";
import clsx from "clsx";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
  showClear?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
  id?: string;
  className?: string;
  defaultValue?: string;
  isDarkMode?: boolean;
}

const sizeStyles = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantStyles = {
  filled: "bg-gray-100 border-transparent",
  outlined: "bg-white border",
  ghost: "bg-transparent border-transparent",
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled,
      invalid,
      variant = "outlined",
      size = "md",
      value,
      onChange,
      type = "text",
      showClear = true,
      showPasswordToggle = false,
      loading = false,
      id,
      className,
      isDarkMode,
      ...rest
    } = props;

    const [internalValue, setInternalValue] = useState(value ?? "");
    const isControlled = value !== undefined;
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const currentValue = isControlled ? value! : internalValue;

    const inputType = type === "password" && passwordVisible ? "text" : type;

    return (
      <div className={clsx("w-full", className)}>
        {label && (
          <label
            htmlFor={id}
            className={`text-xl mb-2 font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {label}
          </label>
        )}
        <div
          className={clsx(
            "relative rounded-md flex items-center",
            variantStyles[variant],
            invalid ? "border-red-500" : "border-gray-300",
            sizeStyles[size],
            disabled && "opacity-50 cursor-not-allowed",
            "border"
          )}
        >
          <input
            id={id}
            ref={ref}
            className={clsx("outline-none bg-transparent w-full", {
              "pl-8": false,
            })}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={invalid}
            aria-describedby={
              errorMessage
                ? `${id}-error`
                : helperText
                ? `${id}-helper`
                : undefined
            }
            type={inputType}
            {...rest}
          />

          {/* loading spinner */}
          {loading && (
            <AiOutlineLoading3Quarters
              className="animate-spin mr-2 h-5 w-5 text-gray-500"
              aria-label="loading"
              role="status"
            />
          )}

          {/* clear button */}
          {!disabled && showClear && currentValue && !loading && (
            <button
              aria-label="Clear input"
              type="button"
              className="p-1 mr-1"
              onClick={() => {
                const e = {
                  target: { value: "" },
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                if (!isControlled) setInternalValue("");
                onChange?.(e);
              }}
            >
              <AiOutlineClose />
            </button>
          )}

          {/* password toggle */}
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              className="p-1 mr-1"
              onClick={() => setPasswordVisible((s) => !s)}
            >
              {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          )}
        </div>

        {/* helper / error */}
        {errorMessage ? (
          <p
            id={`${id}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={`${id}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
