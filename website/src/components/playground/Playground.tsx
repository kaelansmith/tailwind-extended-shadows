"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { cx } from "@/lib/cx";
import {
  blurOptions,
  colorOptions,
  easeOptions,
  layerOptions,
  opacityOptions,
  scaleOptions,
  sizeOptions,
  spreadOptions,
  xOptions,
  yOptions,
  type Option,
} from "./options";

type Settings = {
  size: number;
  x: number | null;
  y: number | null;
  blur: number | null;
  spread: number | null;
  color: number;
  opacity: number;
  layers: number;
  scale: number;
  ease: number;
  dark: boolean;
};

const at = (options: Option[], label: string) =>
  options.findIndex((option) => option.label === label);

const presets: Array<{ name: string; settings: Settings }> = [
  {
    name: "Soft",
    settings: {
      size: at(sizeOptions, "sm"),
      x: null,
      y: at(yOptions, "px"),
      blur: at(blurOptions, "0.5"),
      spread: null,
      color: 0,
      opacity: at(opacityOptions, "10"),
      layers: at(layerOptions, "5"),
      scale: at(scaleOptions, "2"),
      ease: 0,
      dark: false,
    },
  },
  {
    name: "Floating",
    settings: {
      size: at(sizeOptions, "2xl"),
      x: null,
      y: at(yOptions, "6"),
      blur: at(blurOptions, "10"),
      spread: at(spreadOptions, "-3"),
      color: 0,
      opacity: at(opacityOptions, "15"),
      layers: at(layerOptions, "3"),
      scale: at(scaleOptions, "1.5"),
      ease: 0,
      dark: false,
    },
  },
  {
    name: "Long",
    settings: {
      size: at(sizeOptions, "sm"),
      x: at(xOptions, "px"),
      y: at(yOptions, "px"),
      blur: at(blurOptions, "0"),
      spread: null,
      color: 0,
      opacity: at(opacityOptions, "5"),
      layers: at(layerOptions, "8"),
      scale: at(scaleOptions, "1.75"),
      ease: 0,
      dark: false,
    },
  },
  {
    name: "Glow",
    settings: {
      size: at(sizeOptions, "md"),
      x: null,
      y: at(yOptions, "0"),
      blur: at(blurOptions, "6"),
      spread: null,
      color: 2,
      opacity: at(opacityOptions, "40"),
      layers: at(layerOptions, "3"),
      scale: at(scaleOptions, "2"),
      ease: 0,
      dark: true,
    },
  },
  {
    name: "Retro",
    settings: {
      size: at(sizeOptions, "sm"),
      x: at(xOptions, "2"),
      y: at(yOptions, "2"),
      blur: at(blurOptions, "0"),
      spread: null,
      color: 0,
      opacity: at(opacityOptions, "100"),
      layers: at(layerOptions, "1"),
      scale: at(scaleOptions, "1"),
      ease: 0,
      dark: false,
    },
  },
];

export function Playground() {
  const [settings, setSettings] = useState<Settings>(presets[0].settings);
  const [computed, setComputed] = useState<string[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  const update = (patch: Partial<Settings>) =>
    setSettings((current) => ({ ...current, ...patch }));

  const classes = useMemo(() => {
    const hasLayers = layerOptions[settings.layers].className !== null;
    return [
      sizeOptions[settings.size].className,
      settings.x !== null && xOptions[settings.x].className,
      settings.y !== null && yOptions[settings.y].className,
      settings.blur !== null && blurOptions[settings.blur].className,
      settings.spread !== null && spreadOptions[settings.spread].className,
      colorOptions[settings.color].className,
      opacityOptions[settings.opacity].className,
      layerOptions[settings.layers].className,
      hasLayers && scaleOptions[settings.scale].className,
      hasLayers && easeOptions[settings.ease].className,
    ]
      .filter(Boolean)
      .join(" ");
  }, [settings]);

  useEffect(() => {
    if (!previewRef.current) return;
    const value = getComputedStyle(previewRef.current).boxShadow;
    setComputed(
      value
        .split(/,(?![^(]*\))/)
        .map((part) => part.trim())
        .filter((part) => part && !part.startsWith("rgba(0, 0, 0, 0)")),
    );
  }, [classes]);

  const hasLayers = layerOptions[settings.layers].className !== null;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
      <div className="flex flex-col gap-6">
        <div
          className={cx(
            "flex min-h-[26rem] items-center justify-center rounded-3xl p-10 transition-colors",
            settings.dark ? "bg-zinc-900" : "bg-zinc-100/70",
          )}
        >
          <div
            ref={previewRef}
            className={cx(
              "h-40 w-full max-w-xs rounded-2xl",
              settings.dark ? "bg-zinc-800" : "bg-white",
              classes,
            )}
          />
        </div>

        <div className="rounded-xl bg-white ring-1 ring-zinc-900/[0.07]">
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2">
            <span className="text-xs text-zinc-400">Classes</span>
            <CopyButton value={classes} />
          </div>
          <p className="px-4 py-3.5 font-mono text-[13px] leading-relaxed text-indigo-700">
            {classes}
          </p>
        </div>

        <div className="rounded-xl bg-white ring-1 ring-zinc-900/[0.07]">
          <div className="border-b border-zinc-100 px-4 py-2 text-xs text-zinc-400">
            Computed box-shadow ({computed.length}{" "}
            {computed.length === 1 ? "shadow" : "shadows"})
          </div>
          <pre className="overflow-x-auto px-4 py-3.5 font-mono text-xs leading-relaxed text-zinc-600">
            {computed.join(",\n")}
          </pre>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <Group title="Presets">
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setSettings(preset.settings)}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm shadow-zinc-900/5 ring-1 ring-zinc-900/5 hover:text-zinc-950"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </Group>

        <Group title="Base">
          <Segmented
            label="Size"
            options={sizeOptions}
            value={settings.size}
            onChange={(size) => update({ size })}
          />
          <Range
            label="X offset"
            options={xOptions}
            value={settings.x}
            onChange={(x) => update({ x })}
          />
          <Range
            label="Y offset"
            options={yOptions}
            value={settings.y}
            onChange={(y) => update({ y })}
          />
          <Range
            label="Blur"
            options={blurOptions}
            value={settings.blur}
            onChange={(blur) => update({ blur })}
          />
          <Range
            label="Spread"
            options={spreadOptions}
            value={settings.spread}
            onChange={(spread) => update({ spread })}
          />
        </Group>

        <Group title="Color">
          <div className="flex gap-2">
            {colorOptions.map((option, index) => (
              <button
                key={option.label}
                type="button"
                title={option.label}
                aria-label={option.label}
                aria-pressed={settings.color === index}
                onClick={() => update({ color: index })}
                className={cx(
                  "size-6 rounded-full ring-offset-2 ring-offset-zinc-50",
                  option.swatch,
                  settings.color === index ? "ring-2 ring-zinc-400" : "ring-0",
                )}
              />
            ))}
          </div>
          <Range
            label="Opacity"
            options={opacityOptions}
            value={settings.opacity}
            onChange={(opacity) => update({ opacity: opacity ?? 0 })}
            required
          />
        </Group>

        <Group title="Layers">
          <Range
            label="Layers"
            options={layerOptions}
            value={settings.layers}
            onChange={(layers) => update({ layers: layers ?? 0 })}
            required
          />
          <Range
            label="Scale"
            options={scaleOptions}
            value={settings.scale}
            onChange={(scale) => update({ scale: scale ?? 0 })}
            required
            disabled={!hasLayers}
          />
          <Segmented
            label="Ease"
            options={easeOptions}
            value={settings.ease}
            onChange={(ease) => update({ ease })}
            disabled={!hasLayers}
          />
        </Group>

        <Group title="Surface">
          <Segmented
            label="Page"
            options={[
              { label: "Light", className: null },
              { label: "Dark", className: null },
            ]}
            value={settings.dark ? 1 : 0}
            onChange={(index) => update({ dark: index === 1 })}
          />
        </Group>
      </div>
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

type RangeProps = {
  label: string;
  options: Option[];
  value: number | null;
  onChange: (value: number | null) => void;
  /** When false, the control has a "Default" state that removes the class. */
  required?: boolean;
  disabled?: boolean;
};

function Range({
  label,
  options,
  value,
  onChange,
  required,
  disabled,
}: RangeProps) {
  const isDefault = value === null;
  const zeroIndex = Math.max(
    0,
    options.findIndex((option) => option.label === "0"),
  );

  return (
    <label className={cx("flex flex-col gap-2", disabled && "opacity-40")}>
      <span className="flex items-center justify-between text-sm">
        <span className="text-zinc-700">{label}</span>
        <span className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-500">
            {isDefault ? "default" : options[value].label}
          </span>
          {!required && !isDefault ? (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs text-zinc-400 hover:text-zinc-900"
            >
              Reset
            </button>
          ) : null}
        </span>
      </span>
      <input
        type="range"
        min={0}
        max={options.length - 1}
        step={1}
        disabled={disabled}
        value={value ?? zeroIndex}
        onChange={(event) => onChange(Number(event.target.value))}
        className={cx(
          "w-full accent-indigo-600",
          isDefault && "accent-zinc-400",
        )}
      />
    </label>
  );
}

type SegmentedProps = {
  label: string;
  options: Option[];
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

function Segmented({
  label,
  options,
  value,
  onChange,
  disabled,
}: SegmentedProps) {
  return (
    <div
      className={cx(
        "flex flex-col gap-2",
        disabled && "pointer-events-none opacity-40",
      )}
    >
      <span className="text-sm text-zinc-700">{label}</span>
      <div className="flex rounded-lg bg-zinc-900/[0.04] p-0.5">
        {options.map((option, index) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={value === index}
            onClick={() => onChange(index)}
            className={cx(
              "flex-1 rounded-md py-1 text-xs font-medium transition-colors",
              value === index
                ? "bg-white text-zinc-900 shadow-sm shadow-zinc-900/10"
                : "text-zinc-500 hover:text-zinc-900",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
