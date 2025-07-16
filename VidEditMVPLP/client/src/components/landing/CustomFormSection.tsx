import CustomForm from '../CustomForm';

export function CustomFormSection() {
  return (
    <section id="custom-form" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fill out the form below to get started with your professional video editing service.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
            <CustomForm />
          </div>
        </div>
      </div>
    </section>
  );
}
