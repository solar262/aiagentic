
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, XCircle } from "lucide-react";

export const SetupVerification = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Setup Verification Checklist</h2>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-blue-800">
          <strong>Complete this checklist to ensure everything is working properly:</strong>
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="verify-account">
          <AccordionTrigger>Account Setup Verification</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>✅ Email address verified (check your inbox)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>✅ Profile information completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>✅ LinkedIn account connected successfully</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>✅ Phone number verified (if required)</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="verify-integration">
          <AccordionTrigger>Integration Health Check</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">LinkedIn Connection Test:</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Go to Dashboard → LinkedIn Status</li>
                  <li>Look for "Connected" with a green indicator</li>
                  <li>If red/disconnected, click "Reconnect LinkedIn"</li>
                  <li>Test by viewing a few LinkedIn profiles through our platform</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Calendar Integration Test:</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Go to Settings → Calendar Integration</li>
                  <li>Verify your booking link is active</li>
                  <li>Test the link in an incognito browser</li>
                  <li>Book a test appointment to confirm it works</li>
                </ol>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="verify-templates">
          <AccordionTrigger>Template Setup Verification</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Required Templates Checklist:</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>At least 1 connection request template</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>At least 1 follow-up message template</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Templates use variables ({{firstName}}, {{company}})</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Template Testing:</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Go to Message Templates</li>
                  <li>Click "Preview" on each template</li>
                  <li>Verify variables populate correctly</li>
                  <li>Check for typos and formatting</li>
                </ol>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="verify-first-campaign">
          <AccordionTrigger>First Campaign Test</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                <p className="text-sm"><strong>Start small:</strong> Test with 5-10 prospects first</p>
              </div>
              
              <ol className="list-decimal pl-6 space-y-2">
                <li>Create a test campaign with 5-10 prospects</li>
                <li>Use people from your existing network if possible</li>
                <li>Set daily limits to 5 connections per day initially</li>
                <li>Monitor for 2-3 days to ensure everything works</li>
                <li>Check LinkedIn for any warnings or restrictions</li>
                <li>Only scale up after confirming everything works smoothly</li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
