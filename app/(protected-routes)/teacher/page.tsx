"use client";

import { RoleGate } from "@/components/auth/role-gate";
import FormSucess from "@/components/form-sucess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useAuth from "@/lib/hooks/use-auth";
import { UserRole } from "@/lib/type";
import { useState } from "react";
import { toast } from "sonner";

const TeacherPage = () => {
  const [teacher, setTeacher] = useState<{
    firstName: string;
    email: string;
  }>();
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const onApiRouteClick = () => {
    setLoading(true);
    fetch("/api/teacher")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          toast.error("FORBIDDEN");
          console.log("FORBIDDEN");
        }
      })
      .then((data) => {
        setTeacher(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="w-[70%] h-[60vh]">
      <CardHeader>Teacher</CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={[UserRole.TEACHER, UserRole.ADMIN]}>
          <FormSucess message="You have access" />
          {auth.role === UserRole.TEACHER && (
            <div className="flex flex-col items-center justify-between rounded-lg border p-5 shadow-md gap-4 ">
              <div className="flex flex-row w-[50%] items-center justify-between rounded-lg border p-3 shadow-md">
                <p className="text-sm font-medium">Teacher Id</p>
                <p className="text-sm font-medium">{auth.id}</p>
              </div>

              <div className="flex flex-row w-[50%] items-center justify-between rounded-lg border p-3 shadow-md">
                <p className="text-sm font-medium">Teacher Name</p>
                <p className="text-sm font-medium">{auth.name}</p>
              </div>

              <div className="flex flex-row w-[50%] items-center justify-between rounded-lg border p-3 shadow-md">
                <p className="text-sm font-medium">Teacher Email</p>
                <p className="text-sm font-medium">{auth.email}</p>
              </div>
            </div>
          )}
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Teacher-only API Route</p>
            <Button onClick={onApiRouteClick}>Click to test</Button>
          </div>
          {loading && <p>Loading......</p>}
          {!loading && teacher && (
            <>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md px-16">
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm font-medium">{teacher.firstName}</p>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md px-16">
                <p className="text-sm font-medium">Mail</p>
                <p className="text-sm font-medium">{teacher.email}</p>
              </div>
            </>
          )}
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default TeacherPage;
