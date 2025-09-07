"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Command, Mic } from "lucide-react";
import { addToWaitlist } from "@/lib/supabase";

export default function LouisWaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const topSubHeadingRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const consoleButton1Ref = useRef<HTMLDivElement>(null);
  const consoleButton2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Set ALL elements to invisible immediately to prevent flash
      gsap.set([
        logoRef.current,
        topSubHeadingRef.current,
        titleRef.current,
        descriptionRef.current,
        formRef.current,
        consoleButton1Ref.current,
        consoleButton2Ref.current
      ], {
        opacity: 0,
        visibility: 'hidden'
      });

      // Set initial states for content elements
      gsap.set([
        topSubHeadingRef.current,
        titleRef.current,
        descriptionRef.current,
        formRef.current,
      ], {
        y: 30,
        visibility: 'visible'
      });

      // Logo stamp effect - start small and invisible, then "stamp" in
      gsap.set(logoRef.current, {
        scale: 0.3,
        rotation: -5,
        visibility: 'visible'
      });

      // Console buttons - start invisible and slightly scaled down
      gsap.set([consoleButton1Ref.current, consoleButton2Ref.current], {
        scale: 0.8,
        visibility: 'visible'
      });

      // Logo stamp animation and content fade-in happening simultaneously
      tl.to(logoRef.current, {
        duration: 0.6,
        opacity: 1,
        scale: 1.1,
        rotation: 0,
        ease: "back.out(2)",
        transformOrigin: "center center",
      })
        .to(logoRef.current, {
          duration: 0.3,
          scale: 1,
          ease: "power2.out",
        })

        // Start content animations at the same time as logo stamp
        .to(
          topSubHeadingRef.current,
          {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0
        ) // Start at time 0 (same as logo)
        .to(
          titleRef.current,
          {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0
        ) // Start at time 0 (same as logo)
        .to(
          descriptionRef.current,
          {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.2
        ) // Start 0.2s after beginning
        .to(
          formRef.current,
          {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.4
        ) // Start 0.4s after beginning

        // Console buttons animate in with staggered timing
        .to(
          [consoleButton1Ref.current, consoleButton2Ref.current],
          {
            duration: 0.6,
            opacity: 1,
            scale: 1,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          1.2
        ); // Start after main content is in

      // Add continuous pulsing glow effect
      gsap.to([consoleButton1Ref.current, consoleButton2Ref.current], {
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        boxShadow:
          "0 0 50px rgba(249, 115, 22, 1), 0 0 100px rgba(249, 115, 22, 0.8), 0 0 150px rgba(249, 115, 22, 0.6), 0 0 200px rgba(249, 115, 22, 0.4), inset 0 0 40px rgba(249, 115, 22, 0.4)",
        delay: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const { error: supabaseError } = await addToWaitlist(email);
      
      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError("This email is already on the waitlist!");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      // Success animations 
      gsap.to(formRef.current, { 
        opacity: 0, 
        y: -30, 
        duration: 0.4,
        onComplete: () => {
          setIsSubmitted(true);
          gsap.fromTo(successRef.current, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        }
      });
      
    } catch {
      setError("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    gsap.to(successRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      onComplete: () => {
        setIsSubmitted(false);
        setEmail("");
        setError("");
        gsap.fromTo(formRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-orange-500">
      {/* Console Command Buttons - Only visible on large desktop screens */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        {/* Top Left - Command (with orange glow) */}
        <div
          ref={consoleButton1Ref}
          className="absolute top-1/4 left-24 -translate-y-32 xl:left-48 xl:-translate-y-40 w-20 h-20 md:w-24 md:h-24 bg-orange-500/20 backdrop-blur-md border-2 border-orange-400 rounded-2xl flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-orange-500/30 transition-all duration-300 hover:scale-105 gsap-element"
          style={{
            transform: "rotate(-8deg)",
            boxShadow:
              "0 0 30px rgba(249, 115, 22, 0.8), 0 0 60px rgba(249, 115, 22, 0.5), 0 0 100px rgba(249, 115, 22, 0.3), inset 0 0 20px rgba(249, 115, 22, 0.2)",
          }}
        >
          <Command
            className="w-10 h-10 md:w-12 md:h-12 text-orange-200 drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 8px rgba(249, 115, 22, 0.9))" }}
          />
        </div>

        {/* Top Right - Record Button (with orange glow) */}
        <div
          ref={consoleButton2Ref}
          className="absolute top-1/4 right-24 -translate-y-24 xl:right-48 xl:-translate-y-32 w-20 h-20 md:w-24 md:h-24 bg-orange-400/70 backdrop-blur-md border-2 border-orange-400 rounded-2xl flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-orange-400/80 transition-all duration-300 hover:scale-105 gsap-element"
          style={{
            transform: "rotate(12deg)",
            boxShadow:
              "0 0 30px rgba(249, 115, 22, 0.8), 0 0 60px rgba(249, 115, 22, 0.5), 0 0 100px rgba(249, 115, 22, 0.3)",
          }}
        >
          <Mic
            className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-2xl relative z-10"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.9))",
              stroke: "currentColor",
              strokeWidth: 2,
            }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
        {/* Logo */}
        <div ref={logoRef} className="mb-8 gsap-element">
          <Image
            src="/logo.png"
            alt="Louis Logo"
            width={150}
            height={150}
            className="mx-auto"
            priority
          />
        </div>
        
        {/* Top Sub Heading */}
        <p
          ref={topSubHeadingRef}
          className="text-md text-white/80 max-w-2xl mx-auto leading-relaxed gsap-element"
        >
          Meet Louis
        </p>

        {/* Main Heading */}
        <h1
          ref={titleRef}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-tight gsap-element"
        >
          The AI legal scribe for
          <br />
          lawyers & law firms
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed gsap-element"
        >
          Louis is the idiosyncratic AI legal scribe that replaces handwritten
          notes and paperwork with precise capture of trial prep, depositions,
          and client meetings — freeing litigators to focus on strategy and
          serving clients.
        </p>

        {/* CTA Form */}
        {!isSubmitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="max-w-md mx-auto gsap-element">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 text-lg rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 mb-4"
                placeholder="Enter your email address"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-orange-500 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining the waitlist...
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </button>
            </div>
            
            {error && (
              <p className="mt-3 text-red-200 text-sm bg-red-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
                {error}
              </p>
            )}
            
            <p className="text-center text-sm text-white/60 mt-6">
              Join top legal professionals already on the waitlist.
            </p>
          </form>
        ) : (
          <div ref={successRef} className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Welcome to the waitlist!
              </h3>
              <p className="text-white/80 mb-6">
                You&apos;ll be among the first to know when Louis is ready to transform your legal practice.
              </p>
              <button
                onClick={resetForm}
                className="text-white/80 hover:text-white font-medium underline"
              >
                Add another email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
