import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ArrowLeft, Upload, Plus } from 'lucide-react';
import Header from '@/components/Header';
import useAddProduct from '@/hooks/useAddProduct';
import CategoryList from '@/components/CategoryListSelect';
import ColorPicker from '@/components/ColorPicker';
import CustomFormFiled from '../components/CustomFormFiled';
import CustomFieldText from '@/components/CustomFieldText';
import GenericInput from '@/components/GenericInput';
import Size from '@/components/Size';

const AddProduct = () => {
  const { form, state, onSubmit, dispatch, navigate, categories } =
    useAddProduct();

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
              Add New Product
            </h1>
            <p className="text-muted-foreground">
              Create a new product listing for your store
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-border/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
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
                  <CustomFieldText form={form} name="name" />

                  <CustomFieldText
                    form={form}
                    name="brand"
                    placeholder="Enter brand"
                  />

                  <CustomFormFiled
                    form={form}
                    type="number"
                    label="Price ($)"
                    name="price"
                  />

                  <CustomFormFiled
                    form={form}
                    type="number"
                    name="discountPrice"
                    label="Discount Price ($) - Optional"
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
                            {categories.map((category) => (
                              <CategoryList
                                key={category._id}
                                category={category}
                              />
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <CustomFormFiled
                    form={form}
                    type="number"
                    name="inStock"
                    label="Stock Quantity"
                  />

                  <Size />
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
                  {state.features.map((feature, index) => (
                    <GenericInput
                      className={`${index != state.features.length - 1 ? 'transition-opacity opacity-30' : null}`}
                      values={state.features}
                      value={feature}
                      index={index}
                      key={index}
                      onUpdate={(value) =>
                        dispatch({
                          type: 'UPDATE_FEATURE',
                          payload: { value, index },
                        })
                      }
                      onRemove={() =>
                        dispatch({ type: 'REMOVE_FEATURE', payload: index })
                      }
                      placeholder="Enter product feature"
                      disabled={index != state.features.length - 1}
                    />
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      dispatch({
                        type: 'ADD_FEATURE',
                      })
                    }
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
                  {state.images.map((image, index) => (
                    <GenericInput
                      values={state.images}
                      className={`${index != state.images.length - 1 ? 'transition-opacity opacity-30' : null}`}
                      value={image}
                      key={index}
                      index={index}
                      onUpdate={(value) =>
                        dispatch({
                          type: 'UPDATE_IMAGE',
                          payload: { value, index },
                        })
                      }
                      onRemove={() =>
                        dispatch({ type: 'REMOVE_IMAGE', payload: index })
                      }
                      placeholder="Enter image URL"
                      disabled={index != state.images.length - 1}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      dispatch({
                        type: 'ADD_IMAGE',
                      })
                    }
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image URL
                  </Button>
                  <ColorPicker />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" className="flex-1" variant="hero">
                    Add Product
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

export default AddProduct;
