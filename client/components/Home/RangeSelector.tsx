import { LocationContext } from "@/contexts/userLocationContext";
import React, { useContext, useEffect, useState } from "react";

const RangeSelector = () => {
  const [range, setRange] = useState<any>(10);

  const {setRanger, ranger} = useContext(LocationContext)


  useEffect(() => {
    const zoomLevel = Math.max(1, Math.min(21, 21 - Math.floor((100 - range) / 5)));
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
      <label className="font-light text-gray-500 text-[15px]">{(21 - ranger) * 500} metres</label>
    </div>
  );
};

export default RangeSelector;
