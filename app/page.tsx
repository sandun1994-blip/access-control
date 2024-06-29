import { LoginButtton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";





const font =Poppins({
  subsets:['latin'],
  weight :['600']
})


export default function Home() {
  return (
    <main
    className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
   flex h-full flex-col items-center justify-center from-green-500 to-green-600"
  >
    <div className="space-y-6 text-center">
      <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",font.className)}>
      EduAuth
      </h1>
      <p className="text-white text-lg">Role Base Auth</p>

      <div>
        <LoginButtton >
        <Button variant={'secondary'} size='lg'>
          Sign In
        </Button>
        </LoginButtton>
      </div>
    </div>
  </main>
  );
}
