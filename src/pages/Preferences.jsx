import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import CustomAvatar from "../components/CustomAvatar";
import UserUpdateModal from "../components/UserUpdateModal";

const Preferences = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const name = user?.name || user?.username
  return (
    <div className="space-y-6">
      <section className="max-w-full max-h-screen px-6 py-4 rounded-2xl border border-border bg-background/60 shadow-sm">
        <header>
          <h1 className="text-2xl font-semibold">Preferences</h1>
          <p className="text-muted-foreground mt-1">
            Update your personal information and manage your profile settings
            here.
          </p>
        </header>

        <div className="flex items-center gap-4 mt-8 p-4 rounded-lg">
          <CustomAvatar size={72} />
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-muted-foreground">{user?.email || "No Email"}</p>
          </div>
        </div>

        <div className="mt-8">
          <Button
            className="px-4 py-2 text-sm font-medium  rounded-md hover:bg-primary/90 transition"
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </Button>
        </div>

        <UserUpdateModal open={open} onOpenChange={setOpen} />
      </section>

        {/* <section className="max-w-full rounded-2xl border border-border bg-gradient-to-br from-muted/50 via-background to-background p-5 sm:p-7 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 size-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div className="mt-1 shrink-0 rounded-md border border-border bg-background p-2">
              <GithubIcon className="size-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Connect to GitHub</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Link your GitHub account to generate project READMEs quickly and
                personalize suggestions.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {user?.github?.githubConnected ? (
                  <>
                    <span className="text-sm rounded-md border border-emerald-300/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-700 dark:text-emerald-300">
                      Connected
                      {user?.github?.username
                        ? ` as @${user.github.username}`
                        : ""}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleUnlink}
                      disabled={loading}
                    >
                      {loading ? (
                        <LoaderCircle className="animate-spin w-5 h-5" />
                      ) : (
                        "Unlink"
                      )}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      if (githubAuthUrl) {
                        window.location.href = githubAuthUrl;
                      } else {
                        toast("Configure GitHub OAuth", {
                          description:
                            "Set VITE_GITHUB_CLIENT_ID and VITE_GITHUB_CALLBACK_URL in your .env to enable GitHub connect.",
                        });
                      }
                    }}
                  >
                    {loading ? (
                      <LoaderCircle className="animate-spin w-5 h-5" />
                    ) : (
                      <GithubIcon className="size-4" />
                    )}
                    Connect GitHub
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section> */}
    </div>
  );
};

export default Preferences;
