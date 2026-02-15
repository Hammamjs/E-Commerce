import { Truck, Shield, Headphones, Gift } from 'lucide-react';
import { memo } from 'react';

type Feature = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free worldwide shipping on all orders over $100',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Your payment information is processed securely',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get help when you need it, anytime, anywhere',
  },
  {
    icon: Gift,
    title: 'Gift Cards',
    description: 'Perfect for gifting to your loved ones',
  },
];

const FeatureItem = memo(
  ({ feature, index }: { feature: Feature; index: number }) => {
    const Icon = feature.icon;
    const titleId = `feature-title-${index}`;

    return (
      <div
        role="listitem"
        aria-labelledby={titleId}
        className="text-center group animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
          <Icon
            className="h-8 w-8 text-primary-foreground"
            aria-hidden="true"
          />
        </div>
        <h3 id={titleId} className="text-xl font-semibold text-foreground mb-2">
          {feature.title}
        </h3>
        <p className="text-foreground/60">{feature.description}</p>
      </div>
    );
  }
);

const Features = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Features);
