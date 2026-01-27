import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/drizzle"; // your drizzle instance
import {schema} from "../db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from "@/components/emails/verification-email";
import PasswordResetEmail from "@/components/emails/reset-email";


const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL,
    trustedOrigins: [
        process.env.NEXT_PUBLIC_BASE_URL,
        process.env.BASE_URL,
        "https://notly-six.vercel.app",
        "https://notly-krutarth-ravals-projects.vercel.app",
    ].filter(Boolean) as string[],
    emailVerification: {
        sendVerificationEmail: async ({ user, url }, ) => {
            const { data, error } = await resend.emails.send({
              from: "Notely <onboarding@resend.dev>",
              to: [user.email],
              subject: "Verify your email address",
              react: VerificationEmail({ userName: user.name, verificationUrl: url }),
            });
          
            if (error) {
              console.error("Resend error:", error);
            } else {
              console.log("Verification email sent:", data);
            }
          },          
        sendOnSignUp:true,
      },
      socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    emailAndPassword: {
        enabled: true, 
        sendResetPassword: async ({user, url}, ) => {
            await resend.emails.send({
                from: "Notely <onboarding@resend.dev>",
              to: [user.email],
              subject: "Reset your password",
              react:PasswordResetEmail({userEmail:user.email, userName: user.name, resetUrl:url, requestTime:new Date().toLocaleString()})
            });
          },
      },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),
    plugins: [nextCookies()],
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24 // 1 day (optional, but good practice)
    }
});