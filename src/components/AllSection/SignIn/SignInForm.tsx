"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import { MdLockPerson } from "react-icons/md";
import { toast } from "sonner";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomInput from "@/components/Reusable/Form/CustomInput";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/service/auth/authApi";
import { setUser } from "@/redux/service/auth/authSlice";

const svgBackground = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto">
      <path fill="#0EA5E9" fill-opacity="1" d="M0,320L120,293.3C240,267,480,213,720,202.7C960,192,1200,224,1320,240L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
    </svg>`;

interface LoginFormValues {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values: LoginFormValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login(values).unwrap();

      if (res.success) {
        dispatch(setUser({ user: res.data.user, token: res.data.token }));
        toast.success("Logged in Successfully!", { id: toastId });
        router.push("/");
      } else {
        toast.error("Login failed. Please check your credentials.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error?.data?.errorMessage ||
        error?.message ||
        "An unexpected error occurred. Please try again.";

      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          svgBackground
        )}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top -15vh",
      }}
    >
      <div className="flex flex-col h-screen items-center justify-center">
        <CustomForm onSubmit={onSubmit}>
          <CustomInput
            label="Email"
            type="email"
            required
            name="email"
            prefix={<IoMdMail className="text-lg" />}
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            required
            prefix={<MdLockPerson className="text-lg" />}
          />
          <Button
            htmlType="submit"
            loading={isLoading}
            className="w-full"
            type="default"
            size="large"
          >
            Enter
          </Button>
        </CustomForm>
        <div className="flex items-center my-4">
          <div className="border w-full h-0"></div>
          <span className="font-bold">Or</span>
          <div className="border w-full h-0"></div>
        </div>
        <div className="text-center">
          <span>Don’t have an account?</span>
          <Link href="/sign-up" className="font-bold text-primary text-lg">
            {" "}
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
