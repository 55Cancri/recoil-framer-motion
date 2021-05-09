/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import * as colors from "../../styles/colors";

type Props = {
  id: string;
  label: string;
  value: string;
  type?: string;
  on_change: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormRow: React.FC<Props> = (props) => {
  const input_type = props.type ?? "text";
  return (
    <div
      css={{
        display: "grid",
        rowGap: 10,
      }}
    >
      <label
        htmlFor={props.id}
        css={{
          fontSize: 14,
          fontWeight: 300,
          letterSpacing: 1.5,
        }}
      >
        {props.label.toUpperCase()}
      </label>
      <input
        id={props.id}
        type={input_type}
        value={props.value}
        onChange={props.on_change}
        css={{
          padding: "10px 15px",
          borderRadius: 4,
          border: `1px solid ${colors.grey45}`,
          backgroundColor: colors.grey15,
        }}
      />
    </div>
  );
};
