import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Edit, Trash2, Users, MapPin, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface CorporateCompanyManagementProps {
  user?: any;
}

interface Company {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  location?: string;
  employee_count_min?: number;
  employee_count_max?: number;
  website_url?: string;
  domain?: string;
}

export const CorporateCompanyManagement = ({ user }: CorporateCompanyManagementProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    location: "",
    employee_count_min: "",
    employee_count_max: "",
    website_url: "",
    domain: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch companies
  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['corporate-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Company[];
    }
  });

  // Add company mutation
  const addCompanyMutation = useMutation({
    mutationFn: async (company: Omit<Company, 'id'>) => {
      const { data, error } = await supabase
        .from('companies')
        .insert([company])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['corporate-companies'] });
      setShowAddForm(false);
      resetForm();
      toast({
        title: "Company Added",
        description: "Corporate company has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add company. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update company mutation
  const updateCompanyMutation = useMutation({
    mutationFn: async (company: Company) => {
      const { data, error } = await supabase
        .from('companies')
        .update(company)
        .eq('id', company.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['corporate-companies'] });
      setEditingCompany(null);
      resetForm();
      toast({
        title: "Company Updated",
        description: "Company details have been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update company. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete company mutation
  const deleteCompanyMutation = useMutation({
    mutationFn: async (companyId: string) => {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', companyId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['corporate-companies'] });
      toast({
        title: "Company Deleted",
        description: "Company has been removed successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete company. Please try again.",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      industry: "",
      location: "",
      employee_count_min: "",
      employee_count_max: "",
      website_url: "",
      domain: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const companyData = {
      ...formData,
      employee_count_min: formData.employee_count_min ? parseInt(formData.employee_count_min) : null,
      employee_count_max: formData.employee_count_max ? parseInt(formData.employee_count_max) : null,
    };

    if (editingCompany) {
      updateCompanyMutation.mutate({ ...companyData, id: editingCompany.id } as Company);
    } else {
      addCompanyMutation.mutate(companyData);
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name || "",
      description: company.description || "",
      industry: company.industry || "",
      location: company.location || "",
      employee_count_min: company.employee_count_min?.toString() || "",
      employee_count_max: company.employee_count_max?.toString() || "",
      website_url: company.website_url || "",
      domain: company.domain || ""
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingCompany(null);
    resetForm();
  };

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardContent className="p-6">
          <div className="text-center">Loading companies...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Building2 className="w-7 h-7 text-blue-600" />
            <span>Corporate Companies</span>
          </h2>
          <p className="text-slate-600">Manage your UK corporate client database</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle>{editingCompany ? 'Edit Company' : 'Add New Company'}</CardTitle>
            <CardDescription>
              {editingCompany ? 'Update company information' : 'Enter details for the new corporate client'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    placeholder="e.g., Technology, Finance, Healthcare"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the company..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., London, UK"
                  />
                </div>
                <div>
                  <Label htmlFor="website_url">Website</Label>
                  <Input
                    id="website_url"
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                    placeholder="https://company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employee_count_min">Min Employee Count</Label>
                  <Input
                    id="employee_count_min"
                    type="number"
                    value={formData.employee_count_min}
                    onChange={(e) => setFormData(prev => ({ ...prev, employee_count_min: e.target.value }))}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="employee_count_max">Max Employee Count</Label>
                  <Input
                    id="employee_count_max"
                    type="number"
                    value={formData.employee_count_max}
                    onChange={(e) => setFormData(prev => ({ ...prev, employee_count_max: e.target.value }))}
                    placeholder="500"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={addCompanyMutation.isPending || updateCompanyMutation.isPending}>
                  {editingCompany ? 'Update Company' : 'Add Company'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Companies List */}
      {companies.length === 0 ? (
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Companies Yet</h3>
            <p className="text-slate-600 text-center mb-4">
              Add your first corporate client to start managing your coaching business pipeline.
            </p>
            <Button onClick={() => setShowAddForm(true)}>Add Your First Company</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <Card key={company.id} className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    {company.industry && (
                      <Badge variant="secondary" className="mt-1">
                        {company.industry}
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(company)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => deleteCompanyMutation.mutate(company.id)}
                      disabled={deleteCompanyMutation.isPending}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {company.description && (
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {company.description}
                  </p>
                )}
                
                <div className="space-y-2">
                  {company.location && (
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {company.location}
                    </div>
                  )}
                  
                  {(company.employee_count_min || company.employee_count_max) && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="w-3 h-3 mr-1" />
                      {company.employee_count_min && company.employee_count_max
                        ? `${company.employee_count_min}-${company.employee_count_max} employees`
                        : company.employee_count_min
                        ? `${company.employee_count_min}+ employees`
                        : `Up to ${company.employee_count_max} employees`
                      }
                    </div>
                  )}
                  
                  {company.website_url && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Globe className="w-3 h-3 mr-1" />
                      <a 
                        href={company.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};