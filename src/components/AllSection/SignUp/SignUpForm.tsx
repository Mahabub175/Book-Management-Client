"use client";

import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdMail } from "react-icons/io";
import { MdLockPerson } from "react-icons/md";
import { toast } from "sonner";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomInput from "@/components/Reusable/Form/CustomInput";
import { useSignUpMutation } from "@/redux/service/auth/authApi";
import { IoPeople } from "react-icons/io5";

const svgBackground = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto">
      <path fill="#0EA5E9" fill-opacity="1" d="M0,320L120,293.3C240,267,480,213,720,202.7C960,192,1200,224,1320,240L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
    </svg>`;

interface SignUpFormValues {
  name?: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (values: SignUpFormValues) => {
    const toastId = toast.loading("Signing Up...");

    try {
      const res = await signUp(values).unwrap();
      if (res.success) {
        toast.success("Signed Up Successfully!", {
          id: toastId,
        });
        router.push("/sign-in");
      }
    } catch (error: any) {
      toast.error(error.data.errorMessage, {
        id: toastId,
      });
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
        backgroundPosition: "center top -10vh",
      }}
    >
      <div className="flex flex-col h-screen items-center justify-center">
        <CustomForm onSubmit={onSubmit}>
          <CustomInput
            label="Name"
            name="name"
            prefix={<IoPeople className="text-lg" />}
          />
          <CustomInput
            label="Email"
            required
            type="email"
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
            Sign Up
          </Button>
        </CustomForm>
        <div className="flex items-center my-4">
          <div className="border w-full h-0"></div>
          <span className="font-bold">Or</span>
          <div className="border w-full h-0"></div>
        </div>
        <div className="text-center">
          <span>Don’t have an account?</span>
          <Link href="/sign-in" className="font-bold text-primary text-lg">
            {" "}
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
