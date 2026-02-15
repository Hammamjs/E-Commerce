import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const HelpSection = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200/30">
      <CardContent className="p-6 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          💡 Need Help?
        </h3>
        <p className="text-muted-foreground mb-4">
          Our support team is here to help you complete your purchase.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="sm">
            Live Chat
          </Button>
          <Button variant="outline" size="sm">
            FAQ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpSection;
