
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle } from "lucide-react";

export const AccountManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Account Management</h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="billing-subscription">
          <AccordionTrigger>Billing & Subscription Management</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Managing Your Subscription:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Go to Settings → Billing to view current plan</li>
                  <li>Upgrade/downgrade plans anytime</li>
                  <li>Downgrades take effect at next billing cycle</li>
                  <li>Upgrades are prorated and take effect immediately</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Payment Methods:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Credit/debit cards (Visa, MasterCard, American Express)</li>
                  <li>PayPal (for annual subscriptions)</li>
                  <li>Company purchase orders (Enterprise plans only)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Billing Cycle & Invoices:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Monthly plans billed on signup date each month</li>
                  <li>Annual plans offer 2 months free (16% savings)</li>
                  <li>Invoices emailed automatically after each payment</li>
                  <li>Download past invoices from Settings → Billing</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Need a custom plan?</strong> Enterprise customers can contact us for volume discounts and custom features.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="data-export">
          <AccordionTrigger>Data Export & Backup</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">What You Can Export:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Prospect Lists:</strong> All prospect data in CSV format</li>
                  <li><strong>Campaign Results:</strong> Performance metrics and response data</li>
                  <li><strong>Message Templates:</strong> All your custom templates</li>
                  <li><strong>Conversation History:</strong> Full message threads</li>
                  <li><strong>Analytics Data:</strong> Campaign performance over time</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">How to Export Data:</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Go to Settings → Data Export</li>
                  <li>Select the data types you want to export</li>
                  <li>Choose date range (if applicable)</li>
                  <li>Click "Generate Export" - you'll get an email when ready</li>
                  <li>Download files from the provided secure link</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-2">Export Formats:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>CSV:</strong> For prospect lists and campaign data</li>
                  <li><strong>JSON:</strong> For developers and advanced users</li>
                  <li><strong>PDF:</strong> For reports and documentation</li>
                </ul>
              </div>

              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-green-800">
                  <strong>Automatic Backups:</strong> We backup your data daily, but we recommend periodic exports for your own records.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="account-security">
          <AccordionTrigger>Account Security & Privacy</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Password & Login Security:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Change password anytime in Settings → Security</li>
                  <li>Use a strong, unique password for your account</li>
                  <li>Enable two-factor authentication (2FA) for extra security</li>
                  <li>Review login activity in Settings → Security</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Data Privacy & GDPR:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All data encrypted in transit and at rest</li>
                  <li>GDPR compliant data processing</li>
                  <li>You control all prospect data we process</li>
                  <li>No data shared with third parties without consent</li>
                  <li>Request data deletion anytime</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">LinkedIn Account Safety:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We use LinkedIn's official API (safer than browser automation)</li>
                  <li>Respect LinkedIn's terms of service and rate limits</li>
                  <li>Your LinkedIn credentials are never stored</li>
                  <li>Revoke access anytime from LinkedIn settings</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="account-deletion">
          <AccordionTrigger>Account Cancellation & Deletion</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <p className="text-sm text-red-800">
                    <strong>Important:</strong> Account deletion is permanent and cannot be undone. Export your data first!
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Before You Cancel:</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Export all important data (prospects, campaigns, templates)</li>
                  <li>Download any reports or analytics you need</li>
                  <li>Save copies of successful message templates</li>
                  <li>Note any integrations that might be affected</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-2">Cancellation Options:</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Pause Subscription (Recommended)</h5>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Keep your account and data intact</li>
                      <li>Stop billing without losing information</li>
                      <li>Reactivate anytime with same data</li>
                      <li>Available in Settings → Billing → Pause Account</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm">Cancel Subscription</h5>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Stop future billing</li>
                      <li>Keep access until current period ends</li>
                      <li>Data preserved for 90 days after cancellation</li>
                      <li>Available in Settings → Billing → Cancel</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm">Delete Account Permanently</h5>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Immediately removes all data</li>
                      <li>Cannot be undone</li>
                      <li>Disconnects all integrations</li>
                      <li>Available in Settings → Account → Delete Account</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">What Happens After Deletion:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All prospect data permanently removed</li>
                  <li>Campaign history deleted</li>
                  <li>LinkedIn integration disconnected</li>
                  <li>All backups destroyed within 30 days</li>
                  <li>Billing stops immediately</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Need help?</strong> If you're canceling due to issues, let us know. We might be able to help resolve the problem instead.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
