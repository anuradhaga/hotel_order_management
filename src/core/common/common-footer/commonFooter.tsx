"use client";
import Link from "next/link";


const CommonFooter = () => {
  return (
   <>
  {/* Start Footer */}
  <footer className="footer text-center">
        <p className="mb-0 text-dark">
          Copyright © {new Date().getFullYear()} - <Link href="#" className="text-primary">Dreams Timer</Link>
        </p>
      </footer>
  {/* End Footer */}
</>

  );
};

export default CommonFooter;
