import Feature from './Feature';

type FeatureListProps = {
  features: string[];
};

const FeatureList = ({ features }: FeatureListProps) => {
  return features.map((feature, index) => (
    <Feature feature={feature} key={index} />
  ));
};

export default FeatureList;
