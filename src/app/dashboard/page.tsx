"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Settings, User } from "lucide-react"
import { SignOut } from "@/src/components/sign-out"
import { useSession } from "next-auth/react"
import { auth } from "@/src/auth"
import { Header } from "@/src/components/header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  const { data } = useSession()
  const [projectName, setProjectName] = useState("")

  const handleCreateProject = () => {
    // Handle project creation logic here
    console.log("Creating project:", projectName)
    // Reset the project name
    setProjectName("")
  }

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-background border-neutral-700">
            <CardHeader>
              <CardTitle>Welcome, {data?.user?.name}!</CardTitle>
              <CardDescription>Here's an overview of your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full text-lg py-6">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create New Canvas
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[465px]">
                  <DialogHeader>
                    <DialogTitle>Create New Canvas</DialogTitle>
                    <DialogDescription>
                      Enter a name for your new project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="projectName" className="text-right">
                        Project Name
                      </Label>
                      <Input
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="col-span-3"
                        placeholder="Enter project name"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateProject}>Create Project</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}