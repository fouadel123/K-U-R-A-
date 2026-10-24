import React, { useState } from 'react';
import { X, Ruler, Check, HelpCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(72);
  const [fitPreference, setFitPreference] = useState<'standard' | 'oversize'>('oversize');

  if (!isOpen) return null;

  // Simple heuristic algorithm for sizing
  const calculateSize = (): 'S' | 'M' | 'L' | 'XL' | 'XXL' => {
    let score = (heightCm - 150) * 0.5 + (weightKg - 50) * 0.7;
    if (fitPreference === 'oversize') score += 5;

    if (score < 24) return 'S';
    if (score < 34) return 'M';
    if (score < 46) return 'L';
    if (score < 56) return 'XL';
    return 'XXL';
  };

  const recommended = calculateSize();

  const TABLE_DATA = [
    { size: 'S', chest: '58 cm', length: '68 cm', sleeve: '59 cm', height: '160 - 170 cm', weight: '50 - 64 kg' },
    { size: 'M', chest: '61 cm', length: '71 cm', sleeve: '61 cm', height: '168 - 178 cm', weight: '62 - 74 kg' },
    { size: 'L', chest: '64 cm', length: '74 cm', sleeve: '63 cm', height: '175 - 185 cm', weight: '72 - 84 kg' },
    { size: 'XL', chest: '67 cm', length: '77 cm', sleeve: '65 cm', height: '182 - 192 cm', weight: '82 - 95 kg' },
    { size: 'XXL', chest: '70 cm', length: '80 cm', sleeve: '66 cm', height: '188 - 200+ cm', weight: '92 - 110 kg' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg font-bold text-neutral-950 font-display">
              Guide des Tailles & Coupe KURA
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-950 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Size Calculator */}
        <div className="bg-neutral-50 border border-neutral-200 p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
              Calculateur morphologique instantané
            </span>
            <span className="text-neutral-500 font-medium">Coupe Boxy Streetwear</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex justify-between text-neutral-700 mb-1">
                <span>Votre taille :</span>
                <span className="font-mono text-neutral-950 font-bold tabular-nums">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min={150}
                max={205}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-neutral-700 mb-1">
                <span>Votre poids :</span>
                <span className="font-mono text-neutral-950 font-bold tabular-nums">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min={45}
                max={120}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
            <div className="text-xs text-neutral-600">
              Style recherché :
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFitPreference('standard')}
                className={`px-3 py-1 text-xs cursor-pointer border ${
                  fitPreference === 'standard'
                    ? 'bg-neutral-900 border-neutral-900 text-white font-semibold'
                    : 'bg-white border-neutral-300 text-neutral-700'
                }`}
              >
                Ajusté / Confort
              </button>
              <button
                type="button"
                onClick={() => setFitPreference('oversize')}
                className={`px-3 py-1 text-xs cursor-pointer border ${
                  fitPreference === 'oversize'
                    ? 'bg-rose-600 border-rose-600 text-white font-semibold'
                    : 'bg-white border-neutral-300 text-neutral-700'
                }`}
              >
                Oversize Streetwear (Recommandé)
              </button>
            </div>
          </div>

          <div className="p-3 bg-white border border-rose-200 flex items-center justify-between shadow-xs">
            <span className="text-xs text-neutral-800 font-medium">
              Taille idéale recommandée pour vous :
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white font-mono bg-rose-600 px-3 py-0.5">
                {recommended}
              </span>
            </div>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
            Tableau des mensurations (à plat en cm)
          </div>
          <div className="overflow-x-auto border border-neutral-200">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-100 text-neutral-700 border-b border-neutral-200">
                <tr>
                  <th className="py-2.5 px-3">Taille</th>
                  <th className="py-2.5 px-3">Poitrine</th>
                  <th className="py-2.5 px-3">Longueur</th>
                  <th className="py-2.5 px-3">Manche</th>
                  <th className="py-2.5 px-3">Gabarit usuel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                {TABLE_DATA.map((row) => (
                  <tr
                    key={row.size}
                    className={`transition-colors ${
                      row.size === recommended ? 'bg-rose-50 text-neutral-950 font-bold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-neutral-950 flex items-center gap-1.5">
                      <span>{row.size}</span>
                      {row.size === recommended && (
                        <Check className="w-3.5 h-3.5 text-rose-600" />
                      )}
                    </td>
                    <td className="py-2.5 px-3 tabular-nums">{row.chest}</td>
                    <td className="py-2.5 px-3 tabular-nums">{row.length}</td>
                    <td className="py-2.5 px-3 tabular-nums">{row.sleeve}</td>
                    <td className="py-2.5 px-3 text-neutral-500">{row.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note on Fabric */}
        <div className="mt-6 text-xs text-neutral-600 flex items-start gap-2 bg-neutral-50 p-3 border border-neutral-200">
          <HelpCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <p>
            Nos hoodies sont déjà pré-rétrécis en usine à 90°C. Même après de multiples lavages à 30°C, les dimensions restent strictement stables. En cas de doute entre deux tailles, prenez votre taille habituelle pour un fit oversize parfait.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 transition-colors cursor-pointer"
          >
            Fermer le guide
          </button>
        </div>
      </div>
    </div>
  );
};
