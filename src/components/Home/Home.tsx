import Features from './Features';
import Hero from './Hero';
import ProductGrid from '../shared/ProductGrid';
import Carousel from './Carousel';

type HomeProps = {};

const Home = ({}: HomeProps) => {
  return (
    <div className="min-h-screen bg-background mt-28">
      <Hero />
      <Carousel />
      <ProductGrid />
      <Features />
    </div>
  );
};

export default Home;
