import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ArrowLeft, Edit, Plus, X, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import useAddProduct from '@/hooks/useAddProduct';
import useEditProduct from '@/hooks/use-editProduct';

const EditProduct = () => {
  const {
    images,
    features,
    setImages,
    setFeatures,
    updateFeature,
    updateImage,
    addImage,
    removeFeature,
    removeImage,
    addFeature,
  } = useAddProduct();

  const { form, loading, productFound, onSubmit, navigate, isUpdating } =
    useEditProduct({
      images,
      features,
      setImages,
      setFeatures,
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="shadow-xl border-border/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">
                  Loading product details...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!productFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/products')}
              className="hover:bg-accent/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-destructive">
                Product Not Found
              </h1>
              <p className="text-muted-foreground">
                The product you're looking for doesn't exist
              </p>
            </div>
          </div>
          <Card className="shadow-xl border-border/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  This product may have been deleted or the ID is incorrect.
                </p>
                <Button onClick={() => navigate('/products')}>
                  Back to Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-accent/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Edit Product
            </h1>
            <p className="text-muted-foreground">
              Update product information and details
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-border/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Product Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discountPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Original Price ($) - Optional</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Electronics">
                              Electronics
                            </SelectItem>
                            <SelectItem value="Fashion">Fashion</SelectItem>
                            <SelectItem value="Home & Garden">
                              Home & Garden
                            </SelectItem>
                            <SelectItem value="Sports">Sports</SelectItem>
                            <SelectItem value="Beauty">Beauty</SelectItem>
                            <SelectItem value="Toys">Toys</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inStock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">In Stock</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Is this product currently available?
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value > 0}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter detailed product description"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Product Features */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Product Features
                  </Label>
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Enter product feature"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                      />
                      {features.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFeature}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>

                {/* Product Images */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Product Images (URLs)
                  </Label>
                  {images.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Enter image URL"
                        value={image}
                        onChange={(e) => updateImage(index, e.target.value)}
                      />
                      {images.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addImage}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image URL
                  </Button>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" className="flex-1" variant="hero">
                    {isUpdating ? 'Updating...' : 'Update Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;
