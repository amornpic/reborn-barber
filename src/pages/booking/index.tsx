import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

import { Button } from "~/components/ui/button";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { BookingForm } from "~/components/booking-form";

const Booking: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "" });
  const { theme, setTheme } = useTheme();
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>REBORN BARBER</title>
      </Head>
      <main>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            REBORN BARBER
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello.data ? hello.data.greeting : "Loading query..."}
            </p>
          </div>

          {sessionData ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div>
                <Avatar>
                  <AvatarImage
                    src={sessionData?.user.image as string}
                    alt={sessionData.user?.name as string}
                  />
                </Avatar>
              </div>
              <p className="text-center text-2xl">
                <span>{sessionData.user?.name}</span>
              </p>
            </div>
          ) : (
            <Button onClick={() => void signIn()}>Sign in</Button>
          )}

          <div className="grid grid-cols-1 gap-4 ">
            <Button
              size="sm"
              onClick={() => {
                theme === "dark" ? setTheme("light") : setTheme("dark");
              }}
            >
              {theme === "dark" ? <Moon /> : <Sun />}
            </Button>

            <BookingForm />

            <Link href="/">
              <h3 className="text-2xl font-bold">Back</h3>
            </Link>
          </div>

          {sessionData !== null && (
            <div className="flex flex-col items-center gap-2">
              <Button onClick={() => void signOut()}>Sign out</Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Booking;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        {sessionData ? (
          <Avatar>
            <AvatarImage
              src={sessionData?.user.image as string}
              alt={sessionData.user?.name as string}
            />
          </Avatar>
        ) : null}
      </div>
      <p className="text-center text-2xl">
        {sessionData && <span>{sessionData.user?.name}</span>}
      </p>
    </div>
  );
};
