import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-5xl font-semibold">Funroad</h1>
          <p className="text-lg">
            Funroad is a multi-vendor ecommerce platform
          </p>
        </div>
      </div>
    </div>
  );
}
