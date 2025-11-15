import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contactBg from "@/assets/contact-bg.jpg";

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-32"
      style={{
        backgroundImage: `url(${contactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="glass-card p-8 md:p-10 animate-fade-up space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Address</h4>
                <p className="text-white/70">
                  Nairobi, Kenya<br />
                  Westlands, ABC Place
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Phone</h4>
                <p className="text-white/70">+254 700 123 456</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                <p className="text-white/70">info@arts.co.ke</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Working Hours</h4>
                <p className="text-white/70">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 md:p-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <form className="space-y-6">
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
                  type="tel"
                  placeholder="Phone"
                  className="glass-input h-12"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Subject"
                  className="glass-input h-12"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Message"
                  className="glass-input min-h-[150px] resize-none"
                />
              </div>
              <Button className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-base">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
