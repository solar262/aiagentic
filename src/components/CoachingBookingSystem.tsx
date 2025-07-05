import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, MapPin, Phone, Video, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

interface CoachingBookingSystemProps {
  user?: any;
}

interface Appointment {
  id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration_minutes?: number;
  status: string;
  meeting_link?: string;
  outcome?: string;
  next_steps?: string;
  prospects: {
    first_name: string;
    last_name: string;
    title: string;
    email?: string;
    phone?: string;
    companies: {
      name: string;
    } | null;
  };
}

export const CoachingBookingSystem = ({ user }: CoachingBookingSystemProps) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user is authenticated
  const isAuthenticated = user && user.id && user.id !== "demo-user";

  // Fetch appointments
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['coaching-appointments', user?.id],
    queryFn: async () => {
      if (!isAuthenticated) return [];
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          prospects (
            first_name,
            last_name,
            title,
            email,
            phone,
            companies (name)
          )
        `)
        .eq('user_id', user.id)
        .order('scheduled_at', { ascending: true });
      
      if (error) throw error;
      return data as Appointment[];
    },
    enabled: isAuthenticated
  });

  // Update appointment status mutation
  const updateAppointmentMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coaching-appointments'] });
    }
  });

  const handleCompleteAppointment = (appointment: Appointment) => {
    updateAppointmentMutation.mutate({
      id: appointment.id,
      updates: {
        status: 'completed',
        outcome: 'Consultation completed - follow-up scheduled',
        next_steps: 'Send proposal and schedule follow-up call'
      }
    });
    
    toast({
      title: "Appointment Completed",
      description: `Consultation with ${appointment.prospects.first_name} ${appointment.prospects.last_name} marked as completed.`,
    });
  };

  const handleCancelAppointment = (appointment: Appointment) => {
    updateAppointmentMutation.mutate({
      id: appointment.id,
      updates: { status: 'cancelled' }
    });
    
    toast({
      title: "Appointment Cancelled",
      description: `Consultation with ${appointment.prospects.first_name} ${appointment.prospects.last_name} has been cancelled.`,
    });
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments.filter(apt => 
      apt.status === 'scheduled' && new Date(apt.scheduled_at) >= now
    );
  };

  const getPastAppointments = () => {
    const now = new Date();
    return appointments.filter(apt => 
      apt.status === 'completed' || new Date(apt.scheduled_at) < now
    );
  };

  const getTodaysAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.scheduled_at);
      return aptDate >= today && aptDate < tomorrow && apt.status === 'scheduled';
    });
  };

  // Demo/unauthenticated state
  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <Calendar className="w-7 h-7 text-purple-600" />
              <span>Coaching Bookings</span>
            </h2>
            <p className="text-slate-600">Manage your consultation bookings and calendar</p>
          </div>
        </div>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Authentication Required</h3>
            <p className="text-slate-600 text-center mb-4">
              Please sign in to view and manage your coaching consultation bookings.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardContent className="p-6">
          <div className="text-center">Loading bookings...</div>
        </CardContent>
      </Card>
    );
  }

  const upcomingAppointments = getUpcomingAppointments();
  const pastAppointments = getPastAppointments();
  const todaysAppointments = getTodaysAppointments();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Calendar className="w-7 h-7 text-purple-600" />
            <span>Coaching Bookings</span>
          </h2>
          <p className="text-slate-600">Manage your consultation bookings and calendar</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{todaysAppointments.length}</div>
                <div className="text-sm text-slate-600">Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{upcomingAppointments.length}</div>
                <div className="text-sm text-slate-600">Upcoming</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {appointments.filter(a => a.status === 'completed').length}
                </div>
                <div className="text-sm text-slate-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{appointments.length}</div>
                <div className="text-sm text-slate-600">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {todaysAppointments.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Appointments Today</h3>
                <p className="text-slate-600 text-center">
                  You have no coaching consultations scheduled for today.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {todaysAppointments.map((appointment) => (
                <Card key={appointment.id} className="bg-white/60 backdrop-blur-sm border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {appointment.prospects.first_name} {appointment.prospects.last_name}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {appointment.prospects.title} at {appointment.prospects.companies?.name}
                          </p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {format(new Date(appointment.scheduled_at), 'HH:mm')}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {appointment.duration_minutes || 60} minutes
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">Today</Badge>
                        {appointment.meeting_link && (
                          <Button size="sm" variant="outline" onClick={() => window.open(appointment.meeting_link, '_blank')}>
                            <Video className="w-3 h-3 mr-1" />
                            Join
                          </Button>
                        )}
                        <Button size="sm" onClick={() => handleCompleteAppointment(appointment)}>
                          Complete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Upcoming Appointments</h3>
                <p className="text-slate-600 text-center">
                  You have no coaching consultations scheduled. Start a campaign to generate bookings.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="bg-white/60 backdrop-blur-sm border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {appointment.prospects.first_name} {appointment.prospects.last_name}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {appointment.prospects.title} at {appointment.prospects.companies?.name}
                          </p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {format(new Date(appointment.scheduled_at), 'MMM dd, yyyy HH:mm')}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {appointment.duration_minutes || 60} minutes
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Scheduled</Badge>
                        {appointment.meeting_link && (
                          <Button size="sm" variant="outline" onClick={() => window.open(appointment.meeting_link, '_blank')}>
                            <Video className="w-3 h-3 mr-1" />
                            Join
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleCancelAppointment(appointment)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {pastAppointments.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Completed Appointments</h3>
                <p className="text-slate-600 text-center">
                  Your completed coaching consultations will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id} className="bg-white/60 backdrop-blur-sm border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {appointment.prospects.first_name} {appointment.prospects.last_name}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {appointment.prospects.title} at {appointment.prospects.companies?.name}
                          </p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {format(new Date(appointment.scheduled_at), 'MMM dd, yyyy HH:mm')}
                            </span>
                            {appointment.outcome && (
                              <span className="text-green-600">
                                {appointment.outcome}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {appointment.status === 'completed' ? 'Completed' : 'Past'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="bg-white/60 backdrop-blur-sm border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        appointment.status === 'completed' ? 'bg-purple-100' :
                        appointment.status === 'scheduled' ? 'bg-green-100' :
                        'bg-slate-100'
                      }`}>
                        <User className={`w-5 h-5 ${
                          appointment.status === 'completed' ? 'text-purple-600' :
                          appointment.status === 'scheduled' ? 'text-green-600' :
                          'text-slate-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {appointment.prospects.first_name} {appointment.prospects.last_name}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {appointment.prospects.title} at {appointment.prospects.companies?.name}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {format(new Date(appointment.scheduled_at), 'MMM dd, yyyy HH:mm')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {appointment.duration_minutes || 60} minutes
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        appointment.status === 'completed' ? 'outline' :
                        appointment.status === 'scheduled' ? 'default' :
                        'secondary'
                      }>
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};