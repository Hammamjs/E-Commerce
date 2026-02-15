type FeatureProps = {
  feature: string;
};

const Feature = ({ feature }: FeatureProps) => {
  return (
    <li className="flex items-center text-foreground/80">
      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
      {feature}
    </li>
  );
};

export default Feature;
