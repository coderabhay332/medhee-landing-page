import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  label: string;
}

/** iPhone-style shell shared by all feature demos. */
export default function PhoneFrame({ children, label }: PhoneFrameProps) {
  return (
    <div
      role="region"
      aria-label={label}
      className="relative w-full max-w-[340px] sm:max-w-[360px] h-[660px] bg-[#0c0c0d] rounded-[50px] p-[10px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] border-4 border-[#2d2d30] overflow-hidden flex flex-col"
    >
      {/* Dynamic island */}
      <div aria-hidden="true" className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-40" />

      <div className="relative flex-1 bg-white rounded-[40px] overflow-hidden pt-9 flex flex-col">
        {/* Status bar */}
        <div
          aria-hidden="true"
          className="absolute top-2.5 left-7 right-7 flex justify-between items-center text-[11px] font-semibold text-gray-800 z-30 pointer-events-none"
        >
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <span className="w-4 h-2 border border-gray-800 rounded-sm p-[1px] flex">
              <span className="flex-1 bg-gray-800 rounded-[1px]" />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
