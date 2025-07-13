
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface HomeBanner {
  id: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  background_image_url: string;
  stats: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const BannerManagement = () => {
  const [banners, setBanners] = useState<HomeBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<HomeBanner | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('home_banners')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData: HomeBanner[] = (data || []).map(banner => ({
        ...banner,
        stats: Array.isArray(banner.stats) ? banner.stats as Array<{value: string; label: string; icon: string}> : []
      }));
      
      setBanners(transformedData);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast({
        title: "Error",
        description: "Failed to fetch banners",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSaveBanner = async (banner: HomeBanner) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('home_banners')
        .update({
          title: banner.title,
          subtitle: banner.subtitle,
          cta_text: banner.cta_text,
          cta_link: banner.cta_link,
          secondary_cta_text: banner.secondary_cta_text,
          secondary_cta_link: banner.secondary_cta_link,
          background_image_url: banner.background_image_url,
          stats: banner.stats,
          display_order: banner.display_order,
          is_active: banner.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', banner.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Banner updated successfully"
      });

      setEditingBanner(null);
      fetchBanners();
    } catch (error) {
      console.error('Error updating banner:', error);
      toast({
        title: "Error",
        description: "Failed to update banner",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (bannerId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('home_banners')
        .update({ 
          is_active: isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', bannerId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Banner ${isActive ? 'activated' : 'deactivated'}`
      });

      fetchBanners();
    } catch (error) {
      console.error('Error toggling banner:', error);
      toast({
        title: "Error",
        description: "Failed to update banner status",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
            <p className="text-gray-600">Manage home page hero banners</p>
          </div>
        </div>

        <div className="grid gap-6">
          {banners.map((banner) => (
            <Card key={banner.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{banner.title}</CardTitle>
                    <CardDescription>Order: {banner.display_order}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={banner.is_active}
                      onCheckedChange={(checked) => handleToggleActive(banner.id, checked)}
                    />
                    <Label className="text-sm">Active</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingBanner(banner)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {editingBanner?.id === banner.id ? (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={editingBanner.title}
                        onChange={(e) => setEditingBanner({
                          ...editingBanner,
                          title: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="display_order">Display Order</Label>
                      <Input
                        id="display_order"
                        type="number"
                        value={editingBanner.display_order}
                        onChange={(e) => setEditingBanner({
                          ...editingBanner,
                          display_order: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Textarea
                      id="subtitle"
                      value={editingBanner.subtitle}
                      onChange={(e) => setEditingBanner({
                        ...editingBanner,
                        subtitle: e.target.value
                      })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cta_text">Primary Button Text</Label>
                      <Input
                        id="cta_text"
                        value={editingBanner.cta_text}
                        onChange={(e) => setEditingBanner({
                          ...editingBanner,
                          cta_text: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cta_link">Primary Button Link</Label>
                      <Input
                        id="cta_link"
                        value={editingBanner.cta_link}
                        onChange={(e) => setEditingBanner({
                          ...editingBanner,
                          cta_link: e.target.value
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="secondary_cta_text">Secondary Button Text</Label>
                      <Input
                        id="secondary_cta_text"
                        value={editingBanner.secondary_cta_text}
                        onChange={(e) => setEditingBanner({
                          ...editingBanner,
                          secondary_cta_text: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondary_cta_link">Secondary Button Link</Label>
                      <Input
                        id="secondary_cta_link"
                        value={editingBanner.secondary_cta_link}
                        onChange={(e) => setEditingBanner({
                          ...editingBanner,
                          secondary_cta_link: e.target.value
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="background_image_url">Background Image URL</Label>
                    <Input
                      id="background_image_url"
                      value={editingBanner.background_image_url}
                      onChange={(e) => setEditingBanner({
                        ...editingBanner,
                        background_image_url: e.target.value
                      })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSaveBanner(editingBanner)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingBanner(null)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Subtitle:</strong>
                      <p className="text-gray-600 mt-1">{banner.subtitle}</p>
                    </div>
                    <div>
                      <strong>Primary CTA:</strong>
                      <p className="text-gray-600 mt-1">{banner.cta_text} → {banner.cta_link}</p>
                    </div>
                    <div>
                      <strong>Secondary CTA:</strong>
                      <p className="text-gray-600 mt-1">{banner.secondary_cta_text} → {banner.secondary_cta_link}</p>
                    </div>
                    <div>
                      <strong>Background Image:</strong>
                      <p className="text-gray-600 mt-1 truncate">{banner.background_image_url}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BannerManagement;
