import { Filter } from 'lucide-react';
import { Button } from './ui/button';
import type { ReactNode } from 'react';
import { Card } from './ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const FilterSidebarWrapper = ({ sidebar }: { sidebar: ReactNode }) => {
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-80" forceMount>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your product search</SheetDescription>
            </SheetHeader>
            <div className="mt-6 overflow-y-scroll">{sidebar}</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <Card className="p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-6">Filters</h2>
          {sidebar}
        </Card>
      </div>
    </>
  );
};

export default FilterSidebarWrapper;
