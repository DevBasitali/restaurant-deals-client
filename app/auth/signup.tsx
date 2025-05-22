// src/api/auth.js

export const HandleSignup = async (formData: any) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // needed if your backend sets cookies
      body: JSON.stringify(formData),
    });
    
    console.log("This is signup response", response);

    const data = await response.json();
    console.log("This is signup response.json", data);

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
