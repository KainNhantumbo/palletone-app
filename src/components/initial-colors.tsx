import { useMemo } from "react";
import tinyColors from "tinycolor2";
import { copyToClipboard, normalizeColorOutput } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { InputEvent } from "@/types";
import { useSearchParams } from "react-router-dom";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useDebounce } from "@uidotdev/usehooks";

export const InitialColors = () => {
  const [params, setParams] = useSearchParams();
  const debouncedParams = useDebounce(params, 300);

  const colors = useMemo((): Array<{ value: string; name: string }> => {
    return Object.entries(tinyColors.names)
      .map(([key, value]) => ({
        name: key,
        value: `#${value}`
      }))
      .filter((element) =>
        element.name.includes(String(params.get("q") || ""))
      );
  }, [debouncedParams]);

  const onChange = (e: InputEvent) =>
    setParams((current) => ({ ...current, q: e.target.value }), {
      replace: false
    });

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-3 p-2">
      <section className="mx-auto flex w-full max-w-xl flex-col gap-3">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2">
          <Label className="pl-3">Search</Label>
          <Input
            type="search"
            placeholder="Start by typing a color name..."
            className="w-full rounded-3xl border-font/15"
            onChange={onChange}
          />
        </form>

        <p className="leading-relaxed">
          About{" "}
          <span className="font-sans-display font-medium">{colors.length}</span>{" "}
          colors in your workspace!
        </p>
      </section>

      <Separator decorative className="mx-auto w-full max-w-4xl" />

      <section className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-2 p-2 mobile-x:grid-cols-3 md:flex md:flex-wrap md:items-center md:justify-center md:gap-3">
        {colors.map((color, i) => (
          <div
            key={i}
            className="base-shadow flex flex-col gap-3 rounded-2xl bg-foreground-default p-2">
            <div
              className="h-[90px] w-full rounded-2xl shadow-lg md:h-[120px] md:w-[200px]"
              style={{
                background: color.value
              }}
            />

            <div className="flex w-full max-w-[100%] items-center justify-between gap-2">
              <div className="flex max-w-[120px] flex-col gap-1 md:max-w-[160px]">
                <span className="text-xs font-semibold  uppercase md:text-sm">
                  {color.value}
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold uppercase md:text-sm">
                  {color.name}
                </span>
              </div>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="group rounded-xl"
                onClick={() =>
                  copyToClipboard(normalizeColorOutput(color.value, color.name))
                }>
                <CopyIcon className="transition-colors group-hover:stroke-primary-default group-active:stroke-blue-400" />
              </Button>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
