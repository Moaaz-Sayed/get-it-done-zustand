function Spinner() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/40">
      <div
        className="w-16 aspect-square rounded-full
                   [background:radial-gradient(farthest-side,_theme(colors.brand.600)_94%,_transparent)_top/10px_10px_no-repeat,_conic-gradient(transparent_30%,_theme(colors.brand.600))]
                   [mask-image:radial-gradient(farthest-side,_transparent_calc(100%-10px),_black_0)]
                   animate-spin"
      />
    </div>
  );
}

export default Spinner;
