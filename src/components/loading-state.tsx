export function LoadingState({ label = "Preparing a quiet space..." }: { label?: string }) {
  return (
    <div className="rounded-xl border border-[#e4dccd] bg-white/80 p-5 text-sm text-[#68706e]" role="status">
      {label}
    </div>
  );
}
