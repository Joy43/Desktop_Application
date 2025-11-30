
import { GoogleLogin } from "@react-oauth/google";
import { setUser } from "@renderer/redux/features/auth/auth.slice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



const GoogleAuthButton = ({ onSuccess, onError, onOpenChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) {
      console.error("No Google ID Token found");
      toast.error("Google login failed. No ID token found.");
      return;
    }

    try {
      const res = await axios.post(
        "https://indianssydney-backend.onrender.com/auth/google-login",
        { idToken }
      );

      const payload = res?.data;
      const token = payload?.data?.token;
      const user = payload?.data?.user;

      if (!token) {
        toast.error("Login failed. No token received.");
        onOpenChange(false);
        return;
      }

      // Update Redux store
      dispatch(
        setUser({
          user,
          token,
        })
      );

      if (onSuccess) onSuccess(token);

      toast.success("Login successful! Redirecting...");
      onOpenChange(false);

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error("Google login failed. Please try again.");
      if (onError) onError();
    }
  };

  return (
    <div className="mt-4">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          toast.error("Google login failed. Please try again.");
          if (onError) onError();
        }}
        type="standard"
        theme="outline"
        text="continue_with"
        size="large"
      />
    </div>
  );
};

export default GoogleAuthButton;
