import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';

type FormData = {
  name: string;
  email: string;
  videoLength: string;
  contentType: string;
  keyFeatures: string[];
  projectDetails: string;
  footage: FileList | null;
  uploadLink: string;
};

const CustomForm = () => {
  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      videoLength: '',
      contentType: '',
      keyFeatures: [],
      projectDetails: '',
      uploadLink: '',
      footage: null,
    }
  });

  // react-hook-form's handleSubmit will now pass the form to Netlify's handler
  // because of the data-netlify attribute. No custom fetch is needed.
  const onSubmit = () => {
    // This function is intentionally left blank.
    // The form submission is handled by Netlify's built-in functionality
    // due to the `data-netlify="true"` and `method="POST"` attributes on the form.
  };

  const videoOptions = [
    { value: 'Up to 5 minutes - ($90)', label: 'Up to 5 minutes - ($90)' },
    { value: 'Up to 10 minutes - ($120)', label: 'Up to 10 minutes - ($120)' },
    { value: 'Up to 15 minutes - ($150)', label: 'Up to 15 minutes - ($150)' },
  ];
  const contentTypeOptions = ["Gaming", "Tutorial", "Vlog", "Other"];
  const keyFeaturesOptions = ["Motion Graphics", "Captions", "Color Grading", "All"];
  const individualFeatures = keyFeaturesOptions.filter(f => f !== 'All');

  const watchFootage = watch('footage');
  const watchUploadLink = watch('uploadLink');

  return (
    <div className="p-6 md:p-8 space-y-8">
      <form
        name="nvgo-order"
        method="POST"
        action="/thankyou"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        encType="multipart/form-data"
        noValidate
      >
        <input type="hidden" name="form-name" value="nvgo-order" />
        <p className="hidden"><label>Don’t fill this out if you’re human: <input name="bot-field" /></label></p>

        {/* ... (rest of the form fields remain the same) ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name', { required: 'Name is required.' })} placeholder="Your Name" />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email', { required: 'Email is required.', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address.' } })} placeholder="your.email@example.com" />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <Label>What is the video length you need?</Label>
          <Controller
            name="videoLength"
            control={control}
            rules={{ required: 'Please select a video length.' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger><SelectValue placeholder="Select video length" /></SelectTrigger>
                <SelectContent>
                  {videoOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          />
          {errors.videoLength && <p className="text-sm text-red-500 mt-1">{errors.videoLength.message}</p>}
        </div>

        <div className="space-y-1">
          <Label>What type is your content?</Label>
          <Controller
            name="contentType"
            control={control}
            rules={{ required: 'Please select a content type.' }}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
                {contentTypeOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`content-${option}`} />
                    <Label htmlFor={`content-${option}`} className="font-normal">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.contentType && <p className="text-sm text-red-500 mt-1">{errors.contentType.message}</p>}
        </div>

        <div className="space-y-1">
          <Label>Key Features</Label>
          <Controller
              name="keyFeatures"
              control={control}
              rules={{ validate: value => value.length > 0 || 'Please select at least one feature.' }}
              render={({ field }) => (
                  <>
                      {keyFeaturesOptions.map(option => (
                          <div key={option} className="flex items-center space-x-2">
                              <Checkbox
                                  id={`feature-${option}`}
                                  checked={field.value.includes(option)}
                                  onCheckedChange={(checked) => {
                                      let newValues = [...field.value];
                                      if (option === 'All') {
                                        newValues = checked ? [...keyFeaturesOptions] : [];
                                      } else {
                                        newValues = checked ? [...newValues, option] : newValues.filter(val => val !== option);
                                        if (newValues.filter(v => v !== 'All').length === individualFeatures.length) {
                                            if (!newValues.includes('All')) newValues.push('All');
                                        } else {
                                            newValues = newValues.filter(v => v !== 'All');
                                        }
                                      }
                                      setValue('keyFeatures', newValues, { shouldValidate: true });
                                  }}
                              />
                              <Label htmlFor={`feature-${option}`} className="font-normal">{option}</Label>
                          </div>
                      ))}
                  </>
              )}
          />
          {errors.keyFeatures && <p className="text-sm text-red-500 mt-1">{errors.keyFeatures.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="projectDetails">Please describe your project and mention any additional details or special requests.</Label>
          <Textarea id="projectDetails" {...register('projectDetails', { required: 'Project details are required.' })} placeholder="Tell us more about your vision..." />
          {errors.projectDetails && <p className="text-sm text-red-500 mt-1">{errors.projectDetails.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="footage">Footage Upload (only if your files are under 100mb)</Label>
          <Input id="footage" type="file" {...register('footage', { validate: () => (watchFootage && watchFootage.length > 0) || !!watchUploadLink || 'Please upload a file or provide a link.' })} />
          <p className="text-sm text-muted-foreground pt-2">For files over 100MB: please use a service like WeTransfer, Dropbox, or Google Drive and paste the link below.</p>
        </div>

        <div className="space-y-1">
          <Label htmlFor="uploadLink">Or Paste Link for Larger Files</Label>
          <Input id="uploadLink" type="text" {...register('uploadLink')} placeholder="https://we.tl/..." />
           {errors.footage && <p className="text-sm text-red-500 mt-1">{errors.footage.message}</p>}
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  );
};

export default CustomForm;
