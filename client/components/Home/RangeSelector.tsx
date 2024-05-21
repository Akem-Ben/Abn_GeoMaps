import React, { useState } from "react";

const RangeSelector = () => {
  const [range, setRange] = useState<any>(10);
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
        onChange={(e) => setRange(e.target.value)}
      />
      <label className="font-light text-gray-500 text-[15px]">{range * 100} metres</label>
    </div>
  );
};

export default RangeSelector;
