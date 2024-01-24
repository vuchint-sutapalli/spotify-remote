import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";

import { getSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen bg-black overflow-hidden">
     
      <main className="flex">
        <Sidebar />
        <Center />
        {/* main */}
      </main>
      <div className="sticky bottom-0">
        <Player>
          
        </Player>
      </div>
    </div>
  );
}

///bug find
// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   console.log('session fetched in server', session)
//   return {
//     props: {
//       session: session
//     }
//   }
// }
