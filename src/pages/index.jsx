import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <section className="flex flex-col items-center min-h-screen justify-center">
      <section className="bg-[#344658] w-[100%] max-w-fit text-[1.8rem] text-center p-4 rounded-md shadow-md">
        <h2 className="border-b-2 w-fit m-auto">Welcome</h2>

        <section className="flex flex-col gap-2 mt-[3rem]">
          <Button variant="contained" sx={{textTransform:"none", width:"300px", fontSize:"1.5rem", padding:"0", bgcolor:"#486481"}}>
            <Link className="w-full px-4 py-2" href={"/sign-in"}>Sign in</Link>
          </Button>
          <Button variant="contained" sx={{textTransform:"none", width:"300px", fontSize:"1.5rem", padding:"0", bgcolor:"#486481"}}>
            {" "} 
            <Link className="w-full px-4 py-2" href={"/sign-up"}>Sign up</Link>
          </Button>
        </section>
      </section>
    </section>
  );
};

export default index;
