
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle } from "lucide-react";

export const Troubleshooting = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Troubleshooting Guide</h2>
      
      <div className="bg-red-50 p-4 rounded-lg mb-6 border-l-4 border-red-400">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <p className="text-sm text-red-800">
            <strong>Quick Fix:</strong> 90% of issues are resolved by refreshing the page and checking your LinkedIn connection status.
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="trouble-nothing-working">
          <AccordionTrigger>Nothing Is Working / Complete System Check</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Step 1: Basic Checks</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)</li>
                  <li>Check if you're logged in (top right corner shows your name)</li>
                  <li>Verify your internet connection</li>
                  <li>Try a different browser or incognito mode</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-2">Step 2: LinkedIn Connection</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Go to Settings → Integrations</li>
                  <li>Check LinkedIn status - should show "Connected" in green</li>
                  <li>If disconnected, click "Reconnect LinkedIn"</li>
                  <li>Complete LinkedIn authorization process</li>
                  <li>Return to dashboard and verify connection</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-2">Step 3: Account Status</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Check if your email is verified (Settings → Account)</li>
                  <li>Verify your subscription is active (Settings → Billing)</li>
                  <li>Ensure you haven't exceeded usage limits</li>
                </ol>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="trouble-linkedin-errors">
          <AccordionTrigger>LinkedIn Connection & Authorization Issues</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-red-600">Error: "LinkedIn authorization failed"</h4>
                <ol className="list-decimal pl-6 space-y-1 mt-2">
                  <li>Clear your browser cookies for LinkedIn.com</li>
                  <li>Log out of LinkedIn completely</li>
                  <li>Log back into LinkedIn</li>
                  <li>Try reconnecting from our platform</li>
                  <li>Ensure pop-ups are allowed for our domain</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-red-600">Error: "LinkedIn account restricted"</h4>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>LinkedIn has temporarily limited your account</li>
                  <li>This usually resolves in 24-48 hours</li>
                  <li>Reduce daily connection limits when you resume</li>
                  <li>Avoid bulk actions until restriction is lifted</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-red-600">Error: "Rate limit exceeded"</h4>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>You've hit LinkedIn's daily limits</li>
                  <li>Wait 24 hours before resuming activities</li>
                  <li>Lower your daily limits in campaign settings</li>
                  <li>Consider LinkedIn Premium for higher limits</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="trouble-campaigns">
          <AccordionTrigger>Campaign & Automation Problems</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-red-600">Campaign stuck on "Starting..."</h4>
                <ol className="list-decimal pl-6 space-y-1 mt-2">
                  <li>Check LinkedIn connection status</li>
                  <li>Verify you have active prospects in the campaign</li>
                  <li>Ensure daily limits are set above 0</li>
                  <li>Try pausing and restarting the campaign</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-red-600">Messages not being sent</h4>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Check if message templates are properly configured</li>
                  <li>Verify prospects have required data (name, company, etc.)</li>
                  <li>Ensure you haven't exceeded daily sending limits</li>
                  <li>Check for LinkedIn account restrictions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-red-600">Low response rates</h4>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Review message templates for personalization</li>
                  <li>Check if targeting the right audience</li>
                  <li>Ensure LinkedIn profile looks professional</li>
                  <li>Consider A/B testing different message approaches</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="trouble-technical">
          <AccordionTrigger>Technical Issues & Error Messages</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-red-600">Error: "Failed to load data"</h4>
                <ol className="list-decimal pl-6 space-y-1 mt-2">
                  <li>Refresh the page completely</li>
                  <li>Check your internet connection</li>
                  <li>Clear browser cache and cookies</li>
                  <li>Try using a different browser</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-red-600">Page won't load or appears broken</h4>
                <ol className="list-decimal pl-6 space-y-1 mt-2">
                  <li>Hard refresh: Ctrl+F5 (PC) or Cmd+Shift+R (Mac)</li>
                  <li>Disable browser extensions temporarily</li>
                  <li>Try incognito/private browsing mode</li>
                  <li>Clear browser cache completely</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-red-600">Data not syncing or updating</h4>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Allow up to 15 minutes for data synchronization</li>
                  <li>Check LinkedIn connection status</li>
                  <li>Verify you have sufficient API credits</li>
                  <li>Try manually refreshing the specific section</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="trouble-billing">
          <AccordionTrigger>Billing & Subscription Issues</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-red-600">Payment failed or declined</h4>
                <ol className="list-decimal pl-6 space-y-1 mt-2">
                  <li>Verify card details are correct</li>
                  <li>Check if card has sufficient funds</li>
                  <li>Contact your bank about international transactions</li>
                  <li>Try a different payment method</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-red-600">Account shows as "Inactive" despite payment</h4>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Allow up to 24 hours for payment processing</li>
                  <li>Check spam folder for payment confirmation</li>
                  <li>Verify payment went through in your bank statement</li>
                  <li>Log out and log back in to refresh account status</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-red-600">Usage limits reached unexpectedly</h4>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Check Settings → Usage to see current consumption</li>
                  <li>Verify which features are consuming credits</li>
                  <li>Consider upgrading to a higher tier plan</li>
                  <li>Optimize campaigns to use credits more efficiently</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="trouble-contact">
          <AccordionTrigger>When All Else Fails</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                <p className="text-sm">If you've tried everything above and still need help, here's what to do:</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Before Contacting Support:</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Note the exact error message (screenshot if possible)</li>
                  <li>Record what you were trying to do when the issue occurred</li>
                  <li>List the troubleshooting steps you've already tried</li>
                  <li>Check if the issue happens in different browsers</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-2">Community Resources:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Check our Knowledge Base for similar issues</li>
                  <li>Search community forums for solutions</li>
                  <li>Review recent product updates and announcements</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Emergency Workarounds:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use LinkedIn manually for urgent outreach</li>
                  <li>Export your data as backup</li>
                  <li>Pause all campaigns until issue is resolved</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
