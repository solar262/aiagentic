
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="faq-linkedin">
          <AccordionTrigger>Why is my LinkedIn connection rate low?</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your profile may appear incomplete or unprofessional</li>
              <li>Connection requests lack personalization</li>
              <li>You're targeting the wrong audience</li>
              <li>You're sending too many requests too quickly (LinkedIn limits)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-templates">
          <AccordionTrigger>How many message templates should I create?</AccordionTrigger>
          <AccordionContent>
            <p>We recommend:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>3-5 connection request templates</strong> for different industries</li>
              <li><strong>5-7 follow-up templates</strong> for different stages</li>
              <li><strong>2-3 meeting request templates</strong></li>
              <li>Test and rotate them regularly for best results</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-limits">
          <AccordionTrigger>What are LinkedIn's daily limits?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p><strong>Free LinkedIn accounts:</strong></p>
              <ul className="list-disc pl-6">
                <li>20-25 connection requests per day</li>
                <li>100 profile views per day</li>
              </ul>
              <p className="mt-3"><strong>LinkedIn Premium/Sales Navigator:</strong></p>
              <ul className="list-disc pl-6">
                <li>100+ connection requests per day</li>
                <li>Unlimited profile views</li>
                <li>InMail credits included</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-results">
          <AccordionTrigger>How long before I see results?</AccordionTrigger>
          <AccordionContent>
            <p>Typical timeline:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Week 1:</strong> Initial connections start accepting</li>
              <li><strong>Week 2-3:</strong> Follow-up conversations begin</li>
              <li><strong>Week 4-6:</strong> First qualified leads and meetings</li>
              <li><strong>Month 2+:</strong> Consistent lead flow established</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-pricing">
          <AccordionTrigger>Can I change my plan anytime?</AccordionTrigger>
          <AccordionContent>
            <p>Yes! You can:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Upgrade your plan immediately</li>
              <li>Downgrade at the end of your current billing cycle</li>
              <li>Cancel anytime (access continues until period ends)</li>
              <li>Get prorated credits for mid-cycle upgrades</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-data">
          <AccordionTrigger>Is my data secure and private?</AccordionTrigger>
          <AccordionContent>
            <p>Yes, we take security seriously:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>All data encrypted in transit and at rest</li>
              <li>SOC 2 compliant infrastructure</li>
              <li>GDPR compliant data handling</li>
              <li>Regular security audits and updates</li>
              <li>You can export or delete your data anytime</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
