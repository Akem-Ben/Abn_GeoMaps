import { LocationContext } from "@/contexts/userLocationContext";
import React, { useContext, useEffect, useState } from "react";

const RangeSelector = () => {
  const [range, setRange] = useState<any>(10);

  const {setRanger, ranger} = useContext(LocationContext)


  useEffect(() => {
    // Map range (0 to 100) to a suitable zoom level (e.g., 1 to 21)
    const zoomLevel = Math.max(1, Math.min(21, Math.floor(range / 5) + 1));
    setRanger(zoomLevel);
  }, [range, setRanger]);


  return (
    <div>
      <h2 className="font-bold px-2">Select Range (in Metres)</h2>
      <input
        type="range"
        className="w-full h-2 rounded-lg cursor-pointer bg-gray-200 appearance-none"
        min="0"
        max="100"
        step="10"
        defaultValue={range}
        onChange={(e) => setRange(parseInt(e.target.value))}

      />
      <label className="font-light text-gray-500 text-[15px]">{ranger * 100} metres</label>
    </div>
  );
};

export default RangeSelector;
