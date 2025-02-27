import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const Thanks = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-6">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Thank You for Your Order! 🎉
      </h1>
      <p className="text-gray-600 mb-6">
        Your order has been received and is being processed. We appreciate your business!
      </p>
      <Link href={"/Home"}>
      <Button  className="bg-blue-500 text-white px-6 py-2 rounded-lg">
        Back to Home
      </Button>
      </Link>
    
    </div>
  );
};

export default Thanks;
