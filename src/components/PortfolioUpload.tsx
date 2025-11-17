import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2 } from "lucide-react";

interface PortfolioUploadProps {
  artistId: string;
  onUploadComplete: () => void;
}

const PortfolioUpload = ({ artistId, onUploadComplete }: PortfolioUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload to Supabase Storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("portfolios")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("portfolios")
        .getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase.from("portfolio_images").insert({
        artist_id: artistId,
        image_url: publicUrl,
        title: title || null,
        description: description || null,
      });

      if (dbError) throw dbError;

      toast({
        title: "Success!",
        description: "Portfolio image uploaded successfully.",
      });

      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setTitle("");
      setDescription("");
      onUploadComplete();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-primary hover:underline">
                Choose a file
              </span>{" "}
              or drag and drop
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </Label>
            <p className="text-sm text-muted-foreground mt-2">
              PNG, JPG up to 5MB
            </p>
          </div>
        )}
      </div>

      {selectedFile && (
        <>
          <div>
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your image a title"
              className="glass-input"
            />
          </div>

          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this work"
              className="glass-input"
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full"
          >
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload to Portfolio
          </Button>
        </>
      )}
    </div>
  );
};

export default PortfolioUpload;
