"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface PriceFiltersProps {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");

  const formatedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  if (!formatedValue) {
    return "";
  }
  const numberValue = parseFloat(formatedValue);

  if (isNaN(numberValue)) {
    return "";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

export const PriceFilters = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceFiltersProps) => {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value and extract only numeric values
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    onMinPriceChange(numericValue);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value and extract only numeric values
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    onMaxPriceChange(numericValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base" htmlFor="minPrice">
          Minimum Price
        </Label>
        <Input
          type="text"
          placeholder="0 ETB"
          value={minPrice ? formatAsCurrency(minPrice) : ""}
          onChange={handleMinPriceChange}
          className="border rounded p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base" htmlFor="maxPrice">
          Maximum Price
        </Label>
        <Input
          type="text"
          placeholder="∞"
          value={maxPrice ? formatAsCurrency(maxPrice) : ""}
          onChange={handleMaxPriceChange}
          className="border rounded p-2"
        />
      </div>
    </div>
  );
};
