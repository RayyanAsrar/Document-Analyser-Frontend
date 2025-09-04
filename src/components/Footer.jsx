import { Github, Globe, Linkedin, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const linkedinLinkOvais = "https://linkedin.com/in/0vai5";
const linkedinLinkRayyan =
  "https://www.linkedin.com/in/rayyan-asrar-8a44aa31a/";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-[95%] mx-auto mt-20 rounded-t-2xl border border-border bg-background">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-8 text-muted-foreground gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="hidden dark:block w-32"
                src="/OmniView AI-Dark.png"
                alt="Clavero AI Logo"
              />
              <img
                className="dark:hidden block w-32"
                src="/OmniView AI-Light.png"
                alt="Clavero AI Logo"
              />
            </Link>
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Document Analyzer —{" "}
            <span className="text-primary">
              Your AI-powered SaaS for smarter documents
            </span>
          </h3>
          <p className="text-sm max-w-xs">
            Empowering teams to unlock insights from documents with next-gen AI.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Separator className="mx-auto w-[80%]" />
      </div>

      <div className="text-center py-4 text-xs text-muted-foreground">
        © {year} Clavero — Founded by{" "}
        <span className="font-medium text-foreground">
          <a href={linkedinLinkOvais} target="_blank" rel="noopener noreferrer">
            Muhammad Ovais Raza
          </a>
        </span>{" "}
        &{" "}
        <span className="font-medium text-foreground">
          <a
            href={linkedinLinkRayyan}
            target="_blank"
            rel="noopener noreferrer"
          >
            Rayyan Asrar
          </a>
        </span>{" "}
        in Pakistan 🇵🇰
      </div>
    </footer>
  );
};

export default Footer;
