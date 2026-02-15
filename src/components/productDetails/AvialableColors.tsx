type AvialableColorsProps = { colors: string[] };

function AvialableColors({ colors }: AvialableColorsProps) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium">Color:</span>
      <div className="flex items-center space-x-2">
        <div
          className="w-6 h-6 rounded-full border-2 border-border"
          style={{ backgroundColor: colors[0] }}
        />
        <span className="text-sm text-foreground/80 capitalize">{colors}</span>
      </div>
    </div>
  );
}

export default AvialableColors;
