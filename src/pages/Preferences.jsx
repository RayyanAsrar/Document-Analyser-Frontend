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

    </div>
  );
};

export default Preferences;
