const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
