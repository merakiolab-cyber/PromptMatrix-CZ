import React from 'react';
import {
  Camera,
  Aperture,
  Sun,
  Palette,
  Maximize,
  Eye,
  Sparkles,
  RotateCcw,
  Sliders,
  Check
} from 'lucide-react';
import { VisualPropositions } from '../types';

interface VisualPropsControlsProps {
  visualProps: VisualPropositions;
  onChangeVisualProps: (props: VisualPropositions) => void;
  onResetVisualProps: () => void;
}

export const LENS_OPTIONS = [
  { id: 'default', label: 'Výchozí (Automaticky)' },
  { id: '35mm', label: '35mm Leica Summilux (Reportáž & Street)', promptSnippet: 'shot on 35mm Leica Summilux f/1.4 lens' },
  { id: '85mm', label: '85mm f/1.4 Portrait (Měkké pozadí)', promptSnippet: 'shot on 85mm f/1.4 portrait prime lens' },
  { id: '100mm_macro', label: '100mm f/2.8 Macro (Extrémní detail)', promptSnippet: 'extreme macro shot on 100mm f/2.8L Macro lens' },
  { id: '24mm_anamorphic', label: '24mm Anamorphic (Širokoúhlé kino)', promptSnippet: '24mm anamorphic lens with subtle horizontal flares' },
  { id: '50mm_standard', label: '50mm Standard (Lidská perspektiva)', promptSnippet: 'shot on 50mm f/1.2 standard lens' },
  { id: '16mm_wide', label: '16mm Ultra-Wide (Prostorový efekt)', promptSnippet: '16mm ultra wide-angle lens' }
];

export const APERTURE_OPTIONS = [
  { id: 'default', label: 'Výchozí (Automaticky)' },
  { id: 'f1.2', label: 'f/1.2 - Ultra rozostřené pozadí (Bokeh)', promptSnippet: 'f/1.2 aperture, shallow depth of field, creamy bokeh' },
  { id: 'f2.8', label: 'f/2.8 - Měkký přechod ostrosti', promptSnippet: 'f/2.8 aperture with smooth background falloff' },
  { id: 'f5.6', label: 'f/5.6 - Vyváženost pro produkty', promptSnippet: 'f/5.6 aperture with sharp product details' },
  { id: 'f8.0', label: 'f/8.0 - Ostrá architektura a scéna', promptSnippet: 'f/8.0 aperture with front-to-back sharpness' },
  { id: 'f16', label: 'f/16 - Maximální hloubka ostrosti', promptSnippet: 'f/16 aperture, deep depth of field' }
];

export const COLOR_TONALITY_OPTIONS = [
  { id: 'default', label: 'Výchozí (Automaticky)' },
  { id: 'portra400', label: 'Kodak Portra 400 (Teplá přirozená pleť)', promptSnippet: 'Kodak Portra 400 color science, natural skin tones' },
  { id: 'velvia50', label: 'Fuji Velvia 50 (Syté přírodní barvy)', promptSnippet: 'Fuji Velvia 50 vibrant high-contrast color grading' },
  { id: 'teal_orange', label: 'Cinematic Teal & Orange (Filmový kontrast)', promptSnippet: 'cinematic teal and orange color grade' },
  { id: 'ilford_monochrome', label: 'Monochrome Ilford HP5 (Černobílá zrnitost)', promptSnippet: 'black and white Ilford HP5 400 film grain' },
  { id: 'nordic_muted', label: 'Nordic Muted (Chladné skandinávské tóny)', promptSnippet: 'nordic muted cool color palette, desaturated tones' },
  { id: 'warm_gold', label: 'Golden Hour Warm (Teplé zlatavé tóny)', promptSnippet: 'warm golden hour color grading' }
];

export const LIGHTING_OPTIONS = [
  { id: 'default', label: 'Výchozí (Automaticky)' },
  { id: 'soft_daylight', label: 'Soft Window Daylight (Měkké denní světlo z okna)', promptSnippet: 'soft diffused northern window daylight' },
  { id: 'golden_hour', label: 'Golden Hour (Nízké hřejivé slunce)', promptSnippet: 'golden hour directional sunlight with long shadows' },
  { id: 'studio_dual', label: 'Studio Dual Softbox + Rim Light', promptSnippet: 'studio dual softbox lighting with crisp rim lighting' },
  { id: 'volumetric_fog', label: 'Volumetric Rays & Fog (Světelné kužely)', promptSnippet: 'volumetric fog rays, atmospheric raycasts' },
  { id: 'chiaroscuro', label: 'Chiaroscuro / Rembrandt Light (Šerosvit)', promptSnippet: 'dramatic chiaroscuro lighting, deep shadow contrast' },
  { id: 'neon_cyber', label: 'Neon Studio & Rain Reflections', promptSnippet: 'neon lighting with subtle wet asphalt reflections' }
];

export const REALISM_OPTIONS = [
  { id: 'default', label: 'Výchozí (Automaticky)' },
  { id: 'style_raw', label: 'Style Raw (--style raw fotorealismus)', promptSnippet: '--style raw, authentic film grain, no digital smoothing' },
  { id: 'photorealistic', label: 'Reálná pleť & Mikronedokonalosti', promptSnippet: 'authentic skin texture with visible pores and subtle imperfections' },
  { id: 'high_stylization', label: 'Vyšší stylizace (--s 250)', promptSnippet: '--s 250' },
  { id: 'extreme_stylization', label: 'Extrémní umělecká stylizace (--s 750)', promptSnippet: '--s 750' },
  { id: 'minimal_stylization', label: 'Minimalistická čistota (--s 50)', promptSnippet: '--s 50' }
];

export const ASPECT_RATIO_OPTIONS = [
  { id: 'default', label: 'Výchozí' },
  { id: '16:9', label: '16:9 (Film / Web Hero)', promptSnippet: '--ar 16:9' },
  { id: '21:9', label: '21:9 (Ultrawide Kinofilm)', promptSnippet: '--ar 21:9' },
  { id: '4:5', label: '4:5 (Instagram / Portrét)', promptSnippet: '--ar 4:5' },
  { id: '1:1', label: '1:1 (Čtverec / Produkt)', promptSnippet: '--ar 1:1' },
  { id: '9:16', label: '9:16 (Stories / Mobil)', promptSnippet: '--ar 9:16' },
  { id: '3:2', label: '3:2 (Klasická 35mm fotka)', promptSnippet: '--ar 3:2' }
];

export const CAMERA_ANGLE_OPTIONS = [
  { id: 'default', label: 'Výchozí (Automaticky)' },
  { id: 'eye_level', label: 'Eye-Level (Aktivní pohled v úrovni očí)', promptSnippet: 'eye-level camera angle' },
  { id: 'low_angle', label: 'Low-Angle (Pohled zpodu, monumentální)', promptSnippet: 'dramatic low-angle perspective looking up' },
  { id: 'high_angle', label: 'High-Angle (Nadhled shora)', promptSnippet: 'high-angle perspective looking down' },
  { id: 'top_down', label: 'Top-Down Flatlay (Kolmo shora)', promptSnippet: 'top-down flatlay composition' },
  { id: 'isometric', label: 'Izometrický 3D pohled', promptSnippet: 'isometric studio view' }
];

export const OPTICAL_PRESETS: { id: string; name: string; icon: string; props: VisualPropositions }[] = [
  {
    id: 'portrait',
    name: 'Kinematografický Portrét',
    icon: '✨',
    props: {
      lens: '85mm',
      aperture: 'f1.2',
      colorTonality: 'portra400',
      lighting: 'soft_daylight',
      realism: 'style_raw',
      aspectRatio: '16:9',
      cameraAngle: 'eye_level'
    }
  },
  {
    id: 'architecture',
    name: 'Architektura & Interiér',
    icon: '🏢',
    props: {
      lens: '24mm_anamorphic',
      aperture: 'f8.0',
      colorTonality: 'nordic_muted',
      lighting: 'volumetric_fog',
      realism: 'photorealistic',
      aspectRatio: '21:9',
      cameraAngle: 'low_angle'
    }
  },
  {
    id: 'product',
    name: 'Studiový Produkt',
    icon: '📦',
    props: {
      lens: '100mm_macro',
      aperture: 'f5.6',
      colorTonality: 'warm_gold',
      lighting: 'studio_dual',
      realism: 'photorealistic',
      aspectRatio: '1:1',
      cameraAngle: 'eye_level'
    }
  },
  {
    id: 'street',
    name: 'Černobílá Street Fotka',
    icon: '🌆',
    props: {
      lens: '35mm',
      aperture: 'f2.8',
      colorTonality: 'ilford_monochrome',
      lighting: 'chiaroscuro',
      realism: 'style_raw',
      aspectRatio: '3:2',
      cameraAngle: 'eye_level'
    }
  },
  {
    id: 'automotive',
    name: 'Automobil & Action Shot',
    icon: '🏎️',
    props: {
      lens: '16mm_wide',
      aperture: 'f2.8',
      colorTonality: 'teal_orange',
      lighting: 'golden_hour',
      realism: 'high_stylization',
      aspectRatio: '16:9',
      cameraAngle: 'low_angle'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk & Neon Night',
    icon: '🌌',
    props: {
      lens: '24mm_anamorphic',
      aperture: 'f1.2',
      colorTonality: 'teal_orange',
      lighting: 'neon_cyber',
      realism: 'style_raw',
      aspectRatio: '21:9',
      cameraAngle: 'low_angle'
    }
  },
  {
    id: 'fashion',
    name: 'Fashion Editorial & Runway',
    icon: '👗',
    props: {
      lens: '85mm',
      aperture: 'f1.4',
      colorTonality: 'portra400',
      lighting: 'studio_dual',
      realism: 'style_raw',
      aspectRatio: '4:5',
      cameraAngle: 'eye_level'
    }
  },
  {
    id: 'macro_nature',
    name: 'Makro Příroda & Textury',
    icon: '🌿',
    props: {
      lens: '100mm_macro',
      aperture: 'f5.6',
      colorTonality: 'velvia50',
      lighting: 'soft_daylight',
      realism: 'style_raw',
      aspectRatio: '3:2',
      cameraAngle: 'high_angle'
    }
  },
  {
    id: 'food_flatlay',
    name: 'Gastro Flatlay & Stories',
    icon: '🥑',
    props: {
      lens: '50mm_standard',
      aperture: 'f2.8',
      colorTonality: 'warm_gold',
      lighting: 'soft_daylight',
      realism: 'photorealistic',
      aspectRatio: '9:16',
      cameraAngle: 'top_down'
    }
  },
  {
    id: 'isometric_3d',
    name: 'Izometrický 3D Minimalismus',
    icon: '🧊',
    props: {
      lens: '50mm_standard',
      aperture: 'f8.0',
      colorTonality: 'nordic_muted',
      lighting: 'studio_dual',
      realism: 'minimal_stylization',
      aspectRatio: '1:1',
      cameraAngle: 'isometric'
    }
  }
];

export const VisualPropsControls: React.FC<VisualPropsControlsProps> = ({
  visualProps,
  onChangeVisualProps,
  onResetVisualProps
}) => {
  const hasActiveProps = Object.values(visualProps).some((val) => val && val !== 'default');

  const updateProp = (key: keyof VisualPropositions, value: string) => {
    onChangeVisualProps({
      ...visualProps,
      [key]: value
    });
  };

  const applyPresetProps = (props: VisualPropositions) => {
    onChangeVisualProps({ ...props });
  };

  return (
    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Vizualizační Parametry & Optika Fotoaparátu
            </h3>
            {hasActiveProps && (
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/80 px-1.5 py-0.2 rounded-full">
                Aktivní
              </span>
            )}
          </div>
        </div>

        {hasActiveProps && (
          <button
            onClick={onResetVisualProps}
            className="text-[11px] text-zinc-400 hover:text-red-400 font-mono transition-colors flex items-center gap-1 cursor-pointer"
            title="Resetovat všechny optické parametry"
          >
            <RotateCcw className="w-3 h-3 text-zinc-500" />
            <span>Reset optiky</span>
          </button>
        )}
      </div>

      {/* Quick Presets */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
            Rychlé optické presety (10)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {OPTICAL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPresetProps(preset.props)}
              className="px-2.5 py-1 text-[11px] bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
              title={`Aplikovat preset: ${preset.name}`}
            >
              <span>{preset.icon}</span>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* 1. Typ Objektivu (Lens) */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
            <Camera className="w-3 h-3 text-zinc-500" />
            <span>Typ objektivu & Ohnisko</span>
          </label>
          <select
            value={visualProps.lens || 'default'}
            onChange={(e) => updateProp('lens', e.target.value)}
            className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono"
          >
            {LENS_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Clona (Aperture / DOF) */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
            <Aperture className="w-3 h-3 text-zinc-500" />
            <span>Clona & Hloubka ostrosti</span>
          </label>
          <select
            value={visualProps.aperture || 'default'}
            onChange={(e) => updateProp('aperture', e.target.value)}
            className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono"
          >
            {APERTURE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Barevná Tonalita (Color Tonality / Film Stock) */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
            <Palette className="w-3 h-3 text-zinc-500" />
            <span>Barevná tonalita & Film Stock</span>
          </label>
          <select
            value={visualProps.colorTonality || 'default'}
            onChange={(e) => updateProp('colorTonality', e.target.value)}
            className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono"
          >
            {COLOR_TONALITY_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Osvětlení (Lighting Setup) */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
            <Sun className="w-3 h-3 text-zinc-500" />
            <span>Osvětlení & Atmosféra</span>
          </label>
          <select
            value={visualProps.lighting || 'default'}
            onChange={(e) => updateProp('lighting', e.target.value)}
            className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono"
          >
            {LIGHTING_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 5. Úhel Kamery (Camera Angle) */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
            <Eye className="w-3 h-3 text-zinc-500" />
            <span>Úhel pohledu & Kompozice</span>
          </label>
          <select
            value={visualProps.cameraAngle || 'default'}
            onChange={(e) => updateProp('cameraAngle', e.target.value)}
            className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono"
          >
            {CAMERA_ANGLE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 6. Realismus & Stylizace (Stylization) */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-zinc-500" />
            <span>Realističnost & Stylizace</span>
          </label>
          <select
            value={visualProps.realism || 'default'}
            onChange={(e) => updateProp('realism', e.target.value)}
            className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono"
          >
            {REALISM_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 7. Poměr stran (--ar Aspect Ratio) */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
            <Maximize className="w-3 h-3 text-zinc-500" />
            <span>Poměr stran (Aspect Ratio --ar)</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-1">
            {ASPECT_RATIO_OPTIONS.map((opt) => {
              const isSelected = (visualProps.aspectRatio || 'default') === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => updateProp('aspectRatio', opt.id)}
                  className={`py-1.5 px-2 rounded border text-[11px] font-mono transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800 border-amber-500 text-amber-300 font-semibold shadow-sm'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {opt.id === 'default' ? 'Default' : opt.id}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
