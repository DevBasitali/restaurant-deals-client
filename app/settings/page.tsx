"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EyeIcon, EyeOffIcon, MapPin, Store, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RestaurantShell } from "@/components/restaurant-shell"

export default function SettingsPage() {
  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: "Marco Rossi",
    email: "marco@bellaitalia.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    isRestaurantOwner: true,
  })

  // Restaurant profile state
  const [restaurantProfile, setRestaurantProfile] = useState({
    name: "Bella Italia",
    address: "123 Italian Ave, New York, NY 10001",
    phone: "(212) 555-1234",
    website: "https://bellaitalia.example.com",
    description:
      "Bella Italia brings the authentic flavors of Italy to New York. Our chefs use traditional recipes and the freshest ingredients to create memorable dining experiences.",
    cuisineTypes: "Italian, Pizza, Pasta",
  })

  // Profile picture state
  const [profilePicture, setProfilePicture] = useState<string | null>("/placeholder.svg?height=100&width=100")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Password visibility state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Success message state
  const [showSuccess, setShowSuccess] = useState(false)

  // Handle profile picture change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle user profile form change
  const handleUserProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setUserProfile({
      ...userProfile,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle restaurant profile form change
  const handleRestaurantProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRestaurantProfile({
      ...restaurantProfile,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your backend
    console.log("Saving profile:", { userProfile, restaurantProfile, profilePicture })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <RestaurantShell>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and restaurant information.</p>
      </div>

      {showSuccess && (
        <Alert className="my-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>Your profile has been updated successfully!</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="mt-6">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Personal Profile</span>
          </TabsTrigger>
          <TabsTrigger value="restaurant" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span>Restaurant Profile</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Update your profile photo</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profilePicture || ""} alt="Profile" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload a new photo in JPG, PNG or GIF format. Maximum file size: 2MB.
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                          Upload New Picture
                        </Button>
                        {profilePicture && (
                          <Button
                            type="button"
                            variant="outline"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => setProfilePicture(null)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={userProfile.name} onChange={handleUserProfileChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userProfile.email}
                      onChange={handleUserProfileChange}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isRestaurantOwner"
                      name="isRestaurantOwner"
                      checked={userProfile.isRestaurantOwner}
                      onCheckedChange={(checked) => setUserProfile({ ...userProfile, isRestaurantOwner: checked })}
                    />
                    <Label htmlFor="isRestaurantOwner">I am a restaurant owner/manager</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Password Change */}
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={userProfile.currentPassword}
                        onChange={handleUserProfileChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={userProfile.newPassword}
                        onChange={handleUserProfileChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={userProfile.confirmPassword}
                        onChange={handleUserProfileChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="button" variant="outline" className="w-full">
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="restaurant">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {/* Restaurant Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Information</CardTitle>
                  <CardDescription>Update your restaurant details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input
                      id="restaurantName"
                      name="name"
                      value={restaurantProfile.name}
                      onChange={handleRestaurantProfileChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        name="address"
                        value={restaurantProfile.address}
                        onChange={handleRestaurantProfileChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={restaurantProfile.phone}
                        onChange={handleRestaurantProfileChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={restaurantProfile.website}
                        onChange={handleRestaurantProfileChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={restaurantProfile.description}
                      onChange={handleRestaurantProfileChange}
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuisineTypes">Cuisine Types</Label>
                    <Input
                      id="cuisineTypes"
                      name="cuisineTypes"
                      value={restaurantProfile.cuisineTypes}
                      onChange={handleRestaurantProfileChange}
                      placeholder="e.g., Italian, Pizza, Pasta (comma separated)"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Restaurant Photos */}
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Photos</CardTitle>
                  <CardDescription>Upload photos of your restaurant and dishes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-40">
                      <p className="text-sm text-muted-foreground mb-2">Upload restaurant photos</p>
                      <Button type="button" variant="outline" size="sm">
                        Add Photos
                      </Button>
                    </div>
                    <div className="relative h-40 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=160&width=240"
                        alt="Restaurant"
                        className="object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 bg-white/80 hover:bg-white"
                      >
                        <EyeOffIcon className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="relative h-40 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=160&width=240"
                        alt="Restaurant"
                        className="object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 bg-white/80 hover:bg-white"
                      >
                        <EyeOffIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      {/* Save Changes Button */}
      <div className="mt-6 flex justify-end">
        <Button type="submit" onClick={handleSubmit} className="px-8">
          Save Changes
        </Button>
      </div>
    </RestaurantShell>
  )
}
