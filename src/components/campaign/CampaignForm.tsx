
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CampaignFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isAuthenticated: boolean;
}

export const CampaignForm = ({ onSubmit, onCancel, isLoading, isAuthenticated }: CampaignFormProps) => {
  const { toast } = useToast();
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    description: '',
    target_industry: '',
    target_title: [] as string[],
    target_company_size_min: '',
    target_company_size_max: '',
    daily_connection_limit: 20,
    daily_message_limit: 50
  });

  const handleSubmit = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create campaigns.",
        variant: "destructive",
      });
      return;
    }

    if (!campaignForm.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Campaign name is required.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(campaignForm);
    setCampaignForm({
      name: '',
      description: '',
      target_industry: '',
      target_title: [],
      target_company_size_min: '',
      target_company_size_max: '',
      daily_connection_limit: 20,
      daily_message_limit: 50
    });
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle>Create New Campaign</CardTitle>
        <CardDescription>Set up a new automated outreach campaign</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              value={campaignForm.name}
              onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="HR Directors Q1 Outreach"
            />
          </div>
          <div>
            <Label htmlFor="target_industry">Target Industry</Label>
            <Select
              value={campaignForm.target_industry}
              onValueChange={(value) => setCampaignForm(prev => ({ ...prev, target_industry: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="financial-services">Financial Services</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={campaignForm.description}
            onChange={(e) => setCampaignForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the goal and approach of this campaign..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company_size_min">Min Company Size</Label>
            <Input
              id="company_size_min"
              type="number"
              value={campaignForm.target_company_size_min}
              onChange={(e) => setCampaignForm(prev => ({ ...prev, target_company_size_min: e.target.value }))}
              placeholder="100"
            />
          </div>
          <div>
            <Label htmlFor="company_size_max">Max Company Size</Label>
            <Input
              id="company_size_max"
              type="number"
              value={campaignForm.target_company_size_max}
              onChange={(e) => setCampaignForm(prev => ({ ...prev, target_company_size_max: e.target.value }))}
              placeholder="500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="daily_connections">Daily Connection Limit</Label>
            <Input
              id="daily_connections"
              type="number"
              value={campaignForm.daily_connection_limit}
              onChange={(e) => setCampaignForm(prev => ({ 
                ...prev, 
                daily_connection_limit: parseInt(e.target.value) || 0 
              }))}
              min="1"
              max="100"
            />
          </div>
          <div>
            <Label htmlFor="daily_messages">Daily Message Limit</Label>
            <Input
              id="daily_messages"
              type="number"
              value={campaignForm.daily_message_limit}
              onChange={(e) => setCampaignForm(prev => ({ 
                ...prev, 
                daily_message_limit: parseInt(e.target.value) || 0 
              }))}
              min="1"
              max="200"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Campaign'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
