import React from 'react';
import { ShieldCheck, SunMedium, Wrench } from 'lucide-react';

interface ProtocolsListProps {
  techniques: string[];
  lightingProtocol: string;
}

export const ProtocolsList: React.FC<ProtocolsListProps> = ({
  techniques,
  lightingProtocol,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Techniques & Non-Damaging Protocols */}
      <div className="lg:col-span-7 bg-[#18211C] border border-[rgba(216,193,154,0.14)] rounded-xl p-6 md:p-8 ambient-shadow space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#202A24] border border-[#D8C19A]/20 flex items-center justify-center text-[#D8C19A]">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D8C19A] font-semibold block">
              Techniques & Protocols
            </span>
            <h4 className="font-serif text-xl text-[#F2EFE7]">
              Zero-Damage Rental Execution
            </h4>
          </div>
        </div>

        <ul className="space-y-3.5">
          {techniques.map((tech, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-[#C0BBAF] leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-[#202A24] border border-[#D8C19A]/30 text-[#D8C19A] text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{tech}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-[rgba(216,193,154,0.1)] flex items-center gap-2 text-xs text-[#929F87]">
          <ShieldCheck className="w-4 h-4" />
          <span>Security Deposit Safe: No screw holes or drywall patching required.</span>
        </div>
      </div>

      {/* Atmospheric Lighting Protocol */}
      <div className="lg:col-span-5 bg-[#18211C] border border-[rgba(216,193,154,0.14)] rounded-xl p-6 md:p-8 ambient-shadow flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-[#202A24] border border-[#D8C19A]/20 flex items-center justify-center text-[#D8C19A]">
              <SunMedium className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D8C19A] font-semibold block">
                Atmosphere Spec
              </span>
              <h4 className="font-serif text-xl text-[#F2EFE7]">
                Lighting Temperature
              </h4>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#C0BBAF] leading-relaxed">
            {lightingProtocol}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#202A24] border border-[rgba(216,193,154,0.1)] flex items-center justify-between">
          <span className="text-xs text-[#898C83]">Target Kelvin</span>
          <span className="text-sm font-semibold text-[#D8C19A] font-mono">
            2200K – 2700K (Warm Amber)
          </span>
        </div>
      </div>
    </div>
  );
};
