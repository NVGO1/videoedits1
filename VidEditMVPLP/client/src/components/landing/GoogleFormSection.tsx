export function GoogleFormSection() {
  return (
    <section id="google-form" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
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
            <iframe
 src="https://docs.google.com/forms/d/e/1FAIpQLScEKUc21_SQTHfX-zz5XuBJDunFMnLKiIG1n7bWv-_V5ppsHQ/viewform?embedded=true"
 width="100%"
              height="500"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full"
              title="Video Editing Service Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}