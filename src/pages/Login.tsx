import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { Leaf, School, MapPin, Users } from 'lucide-react';

const schools = [
  { id: '1', name: 'Green Valley High School', location: 'Mumbai', type: 'urban' },
  { id: '2', name: 'Rural Education Center', location: 'Nashik', type: 'rural' },
  { id: '3', name: 'Eco International School', location: 'Pune', type: 'urban' },
  { id: '4', name: 'Village Primary School', location: 'Aurangabad', type: 'rural' },
];

export default function Login() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [selectedSchool, setSelectedSchool] = useState('');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');

  const handleLogin = () => {
    // Demo navigation based on user type
    if (userType === 'teacher') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4 safe-area-top">
      <div className="w-full max-w-md space-y-6 animate-slide-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-gradient-eco rounded-full animate-float">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold bg-gradient-eco bg-clip-text text-transparent">
              EcoLearn
            </h1>
          </div>
          <p className="text-muted-foreground">
            {t('welcome')} to environmental education!
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center pt-2">
            <LanguageToggle 
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </div>

        {/* Login Form */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-center">{t('login')} / {t('signup')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'student' | 'teacher')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  Teacher
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="student@school.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </TabsContent>

              <TabsContent value="teacher" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email</Label>
                  <Input id="teacher-email" type="email" placeholder="teacher@school.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher-password">Password</Label>
                  <Input id="teacher-password" type="password" />
                </div>
              </TabsContent>
            </Tabs>

            {/* School Selection */}
            <div className="space-y-2">
              <Label htmlFor="school">{t('selectSchool')}</Label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectSchool')} />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{school.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {school.location} • {school.type === 'rural' ? t('rural') : t('urban')}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Login Button */}
            <Button 
              onClick={handleLogin}
              variant="eco" 
              size="lg" 
              className="w-full"
              disabled={!selectedSchool}
            >
              {t('login')}
            </Button>

            {/* Demo Info */}
            <div className="text-center text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p>Demo Mode: Click login to continue</p>
              <p>Select any school to proceed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}