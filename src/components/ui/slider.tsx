import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderControlVariants = cva(
  "relative flex w-full touch-none select-none items-center data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
  {
    variants: {
      size: {
        default: "py-2",
        lg: "min-h-14 py-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-muted select-none data-vertical:h-full data-vertical:w-1 data-horizontal:w-full",
  {
    variants: {
      size: {
        default: "data-horizontal:h-1",
        lg: "data-horizontal:h-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

const sliderThumbVariants = cva(
  "relative block shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 after:absolute after:rounded-full hover:ring-3 focus-visible:ring-3 active:ring-3",
  {
    variants: {
      size: {
        default: "size-4 after:-inset-3",
        lg: "size-6 after:-inset-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  size = "default",
  ...props
}: SliderPrimitive.Root.Props & VariantProps<typeof sliderControlVariants>) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control
        className={sliderControlVariants({ size })}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={sliderTrackVariants({ size })}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={sliderThumbVariants({ size })}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
