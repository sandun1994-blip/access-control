"use client";

import { RoleGate } from "@/components/auth/role-gate";
import FormSucess from "@/components/form-sucess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@/lib/type";
import { useState } from "react";
import { toast } from "sonner";

const StudentPage = () => {
  const [student, setStudent] = useState<{ firstName: string; email: string }>();
  const [loading, setLoading] = useState(false);

  const onApiRouteClick = () => {
    setLoading(true);
    fetch("/api/student")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          toast.error("FORBIDDEN");
          console.log("FORBIDDEN");
        }
      })
      .then((data) => {
        setStudent(data.data);
      }).catch(err=>{
        console.log(err);
        
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="w-[70%] h-[60vh]">
      <CardHeader>Student</CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={[UserRole.STUDENT,UserRole.ADMIN]}>
          <FormSucess message="You have access" />

          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Student-only API Route</p>
            <Button onClick={onApiRouteClick}>Click to test</Button>
          </div>
          {loading && <p>Loading......</p>}
          {!loading && student && (
            <>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md px-16">
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm font-medium">{student.firstName}</p>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md px-16">
                <p className="text-sm font-medium">Mail</p>
                <p className="text-sm font-medium">{student.email}</p>
              </div>
            </>
          )}
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default StudentPage;
