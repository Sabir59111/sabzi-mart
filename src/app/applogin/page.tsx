"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const WhatsAppLogin = () => {
    const [phone, setPhone] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone.match(/^\d{10,}$/)) {
            alert("Enter a valid phone number!");
            return;
        }

        localStorage.setItem("phone", phone);
        router.push("/Home");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 relative">
            {/* Top Left Fruit Image */}
            <div className="absolute top-0 left-0 w-[250px] h-[180px] md:w-[320px] md:h-[270px] bg-no-repeat bg-contain z-9"
                style={{ backgroundImage: "url('https://sabzifruit.pk/images/fruit.png')" }}>
            </div>

            {/* Main Form Card */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md md:max-w-3xl z-10 opacity-95">
                {/* Logo Centered */}
                <div className="flex justify-center">
                    <img src="/logo.png" alt="Sabzi Fruit Logo" className="w-24 h-24 md:w-36 md:h-36" />
                </div>

                {/* Heading */}
                <h2 className="text-lg md:text-2xl font-semibold text-center mt-4">
                    Please enter your WhatsApp mobile number to proceed further
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6">
                    <input
                        type="text"
                        placeholder="Enter Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-center"
                        required
                    />

                    {/* Info Text */}
                    <p className="text-black text-sm text-center mt-2 px-4 md:px-20">
                        Feel free to enter your WhatsApp number. It will only be used for sending the order ID or for delivery purposes.
                    </p>

                    {/* Continue Button */}
                    <div className="flex justify-center">
                        <button type="submit"
                            className="w-36 md:w-40 bg-[#5dbf02] text-white px-4 py-3 mt-4 rounded-full font-semibold hover:bg-black transition">
                            CONTINUE
                        </button>
                    </div>
                </form>

                {/* Working Hours */}
                <p className="text-xs md:text-sm text-center bg-orange-200 text-orange-800 py-2 mt-4 rounded-lg">
                    Working Days: Monday to Sunday, Working Hours: 9:00 AM to 6:00 PM
                </p>
            </div>

            {/* Bottom Left Icons */}
            <div className="fixed bottom-6 left-6 flex space-x-4">
                <img src="/image.png" alt="WhatsApp Icon" className="h-12 md:h-16" />
                <img src="/phone.png" alt="Phone Icon" className="h-12 md:h-16" />
            </div>

            {/* Bottom Right Vegetable Image */}
            <div className="fixed bottom-0 right-0 w-[250px] md:w-[500px] h-[180px] md:h-[320px] bg-no-repeat bg-contain"
                style={{ backgroundImage: "url('https://sabzifruit.pk/images/vegitable.png')" }}>
            </div>
        </div>
    );
};

export default WhatsAppLogin;
