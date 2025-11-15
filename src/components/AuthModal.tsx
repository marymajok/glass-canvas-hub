import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Quote } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-card border-white/25 p-0 overflow-hidden">
        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white text-center mb-6">
              Welcome to Arts
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70"
              >
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="glass-input h-12"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  className="glass-input h-12"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-white/70">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-primary hover:text-primary/80">
                  Forgot password?
                </a>
              </div>
              <Button className="w-full bg-primary text-white hover:bg-primary/90 h-12">
                Log In
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="glass-input h-12"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="glass-input h-12"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  className="glass-input h-12"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="glass-input h-12"
                />
              </div>
              <div className="flex items-start text-sm">
                <input type="checkbox" className="mr-2 mt-1" />
                <label className="text-white/70">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </a>
                </label>
              </div>
              <Button className="w-full bg-primary text-white hover:bg-primary/90 h-12">
                Sign Up
              </Button>
            </TabsContent>
          </Tabs>

          {/* Testimonial */}
          <div className="mt-8 p-6 rounded-lg bg-white/5 border border-white/10">
            <Quote className="w-6 h-6 text-primary mb-3" />
            <p className="text-white/80 text-sm italic mb-3">
              "Arts made finding the perfect photographer for my wedding so easy!
              The platform is intuitive and the artists are incredibly talented."
            </p>
            <p className="text-white/60 text-sm font-medium">
              — Grace Njeri, Happy Client
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
