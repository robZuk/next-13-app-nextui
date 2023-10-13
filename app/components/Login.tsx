import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const form = useForm<z.infer<typeof formSchema>>s({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  const [isLoading, setIsLoading] = React.useState(false);

  const validationSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    // confirmPassword: z
    //   .string()
    //   .min(1, { message: "Confirm Password is required" }),
    // terms: z.literal(true, {
    //   errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    // }),
  });
  // .refine((data) => data.password === data.confirmPassword, {
  //   path: ["confirmPassword"],
  //   message: "Password don't match",
  // });
  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
    onClose();
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.info("Login success", {
          position: "top-center",
          theme: "colored",
        });
        router.refresh();
      }

      if (callback?.error) {
        toast.error("Login failed", {
          position: "top-center",
          theme: "colored",
        });
      }
    });
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    reset();
  }, [onOpenChange]);

  return (
    <div>
      <Button onPress={onOpen}>Login</Button>
      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {/* {(onClose) => ( */}
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl">
              Sign In to your account
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  value={email}
                  onValueChange={setEmail}
                  id="email"
                  label="Email"
                  variant="bordered"
                  size="sm"
                  {...register("email")}
                  isInvalid={Boolean(errors?.email)}
                  errorMessage={errors?.email?.message}
                />

                <Input
                  value={password}
                  onValueChange={setPassword}
                  id="password"
                  label="Password"
                  variant="bordered"
                  size="sm"
                  {...register("password")}
                  isInvalid={Boolean(errors?.password)}
                  errorMessage={errors?.password?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <div className="text-xs text-gray-500 flex">
                  <span className="grow border-b-1 mb-2 mr-2  border-gray-300"></span>
                  <span className="grow-0">OR CONTINUE WITH</span>
                  <span className="grow border-b-1 mb-2 ml-2  border-gray-300"></span>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="light"
                    radius="sm"
                    size="lg"
                    className="border-1 px-10"
                    startContent={<FaGoogle />}
                    onClick={() => signIn("google")}
                  >
                    Google
                  </Button>
                  <Button
                    variant="light"
                    radius="sm"
                    size="lg"
                    className="border-1 px-10"
                    startContent={<FaGithub />}
                    onClick={() => signIn("github")}
                  >
                    Github
                  </Button>
                </div>
                <Button type="submit" variant="ghost" className="w-full mb-6">
                  Sign In
                </Button>
              </form>
            </ModalBody>
          </>
          {/* )} */}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
