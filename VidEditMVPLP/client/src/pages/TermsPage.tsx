import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';

export function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Terms and Conditions
            </CardTitle>
            <p className="text-muted-foreground mt-4">
              Last updated: January 2025
            </p>
          </CardHeader>

          <CardContent className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using NVGO LLC's video editing services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NVGO LLC provides professional video editing services for YouTube content creators. Our services include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Video editing and post-production</li>
                <li>Motion graphics and animations</li>
                <li>Color grading and correction</li>
                <li>Professional captions and subtitles</li>
                <li>Custom intro/outro creation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Payment is required in full before work begins on your project. We accept:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Major credit cards (Visa, MasterCard, American Express)</li>
                <li>PayPal</li>
                <li>Bank transfers</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                All prices are in USD and are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Delivery and Revisions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We guarantee delivery within 36 hours of receiving your raw footage and project requirements. Each package includes one (1) free revision. Additional revisions may be subject to additional charges.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain full ownership of your original content. Upon full payment, you will receive full commercial rights to the edited video. We reserve the right to use completed projects in our portfolio and marketing materials unless otherwise agreed upon in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                NVGO LLC's liability is limited to the amount paid for the specific service. We are not responsible for any indirect, incidental, or consequential damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cancellation Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Projects may be cancelled within 2 hours of payment for a full refund. After work has begun, cancellations are subject to a 50% cancellation fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms and Conditions, please contact us at:
                <br />
                Email: Support@letsnvgo.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}