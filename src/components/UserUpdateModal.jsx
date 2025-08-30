import { LoaderCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

const UserUpdateModal = ({ open, onOpenChange }) => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user?.profileImage || "");
  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const files = e.target.files;
    const selectedFile = files && files.length > 0 ? files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(user?.profileImage || "");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!username.trim()) newErrors.username = "Username is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));
    // TODO: handle actual update logic
    setIsSubmitting(false);
    // Optionally close modal or show success
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="Edit your profile information">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={updateHandler} className="space-y-4 mt-2 relative">
          <div>
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
              disabled={isSubmitting}
            />
            {errors.name && (
              <span id="name-error" className="text-xs text-red-500">
                {errors.name}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="username" className="mb-2">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={!!errors.username}
              aria-describedby="username-error"
              disabled={isSubmitting}
            />
            {errors.username && (
              <span id="username-error" className="text-xs text-red-500">
                {errors.username}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="file" className="mb-2 block">
              Profile Picture
            </Label>
            <div className="h-24 w-24 mb-2 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile preview"
                  className="object-cover h-full w-full"
                />
              ) : (
                <span className="text-xs text-gray-400">No image</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="file"
                className="cursor-pointer px-4 py-2 text-sm rounded-md border border-gray-300 transition"
              >
                Choose File
              </label>
              {file ? (
                <span className="text-sm text-secondary font-semibold truncate max-w-[200px]">
                  {file.name}
                </span>
              ) : (
                <span className="text-sm">No file selected</span>
              )}
            </div>
            <Input
              id="file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button disabled={isSubmitting} variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="default"
              className="bg-primary hover:bg-primary/90 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserUpdateModal;
