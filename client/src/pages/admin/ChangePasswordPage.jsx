import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Eye, EyeOff, Lock, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "../../components/ui/alert";

const PasswordInput = ({
  label,
  value,
  onChange,
  error,
  showToggle = true,
  id,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-2">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={error ? "border-red-500" : ""}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            {show ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.newPassword.length >= 8 },
    {
      text: "Contains uppercase and lowercase",
      met:
        /[a-z]/.test(formData.newPassword) &&
        /[A-Z]/.test(formData.newPassword),
    },
    { text: "Contains a number", met: /\d/.test(formData.newPassword) },
    {
      text: "Contains a special character",
      met: /[^a-zA-Z\d]/.test(formData.newPassword),
    },
  ];

  const validateForm = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword)
      newErrors.newPassword = "New password is required";
    else if (formData.newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters";
    else if (passwordStrength < 3)
      newErrors.newPassword = "Password is too weak";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `https://greenco-jmk5.onrender.com/api/auth/change-password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Send cookie
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to change password");

      toast.success(data.message);

      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Redirect to login after password change
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStrengthColor = () =>
    passwordStrength <= 2
      ? "bg-red-500"
      : passwordStrength <= 3
      ? "bg-orange-500"
      : "bg-green-500";
  const getStrengthText = () =>
    passwordStrength <= 2
      ? "Weak"
      : passwordStrength <= 3
      ? "Medium"
      : "Strong";

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-slate-900 dark:text-white mb-2">Change Password</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Update your password to keep your account secure
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <Lock className="w-5 h-5 text-green-500" /> Update Password
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Choose a strong password to protect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PasswordInput
              id="currentPassword"
              label="Current Password"
              value={formData.currentPassword}
              onChange={(v) => updateField("currentPassword", v)}
              error={errors.currentPassword}
            />

            <PasswordInput
              id="newPassword"
              label="New Password"
              value={formData.newPassword}
              onChange={(v) => updateField("newPassword", v)}
              error={errors.newPassword}
            />

            {formData.newPassword && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Password strength:
                  </span>
                  <span
                    className={`font-medium ${
                      passwordStrength <= 2
                        ? "text-red-600"
                        : passwordStrength <= 3
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {getStrengthText()}
                  </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <PasswordInput
              id="confirmPassword"
              label="Confirm New Password"
              value={formData.confirmPassword}
              onChange={(v) => updateField("confirmPassword", v)}
              error={errors.confirmPassword}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white min-w-[140px]"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
