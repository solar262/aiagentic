
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";

export const GettingStarted = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-green-800">
          <strong>Follow this 5-minute setup guide to get your first campaign running!</strong>
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="setup-account">
          <AccordionTrigger>Step 1: Account Setup (2 minutes)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Connect Your LinkedIn Account</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Go to Settings → Integrations → LinkedIn and click "Connect". This allows us to automate your outreach safely.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Complete Your Profile</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Add your company details and contact information. This helps with message personalization.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Verify Your Email</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Check your inbox and click the verification link we sent you.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="create-templates">
          <AccordionTrigger>Step 2: Create Message Templates (2 minutes)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Templates save you time and ensure consistent messaging. You can use variables like <code>{{firstName}}</code> for personalization.
              </p>

              <div>
                <h4 className="font-medium mb-2">Quick Template Examples:</h4>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p><strong>Connection Request:</strong></p>
                  <p className="italic">"Hi {{firstName}}, I noticed we both work in {{industry}}. Would love to connect and share insights!"</p>
                  
                  <p className="mt-3"><strong>Follow-up Message:</strong></p>
                  <p className="italic">"Thanks for connecting, {{firstName}}! I help {{company}} companies like {{companyName}} with [your service]. Would you be open to a quick chat this week?"</p>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Start with 2-3 templates and refine them based on response rates.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="add-prospects">
          <AccordionTrigger>Step 3: Add Your First Prospects (1 minute)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Three Ways to Add Prospects:</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li><strong>Manual Entry:</strong> Click "Add Prospect" and fill in details</li>
                  <li><strong>CSV Upload:</strong> Upload a spreadsheet with prospect information</li>
                  <li><strong>LinkedIn Import:</strong> Use our Chrome extension to import directly</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-2">Required Fields:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full Name</li>
                  <li>LinkedIn Profile URL</li>
                  <li>Company Name (optional but recommended)</li>
                  <li>Job Title (optional but recommended)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Start Small:</strong> Add 10-20 prospects for your first campaign to test everything works properly.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="launch-campaign">
          <AccordionTrigger>Step 4: Launch Your First Campaign</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Campaign Setup Checklist:</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Select your prospects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Choose message templates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Set daily limits (start with 10-15 per day)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Schedule working hours</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommended First Campaign Settings:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Daily Connection Requests:</strong> 10-15 (safe starting point)</li>
                  <li><strong>Follow-up Delay:</strong> 3-5 days after connection</li>
                  <li><strong>Working Hours:</strong> 9 AM - 5 PM in your timezone</li>
                  <li><strong>Weekend Activity:</strong> Disabled for better engagement</li>
                </ul>
              </div>

              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-green-800">
                  <strong>You're Ready!</strong> Click "Launch Campaign" and monitor your dashboard for results. Most users see their first connections within 24-48 hours.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
