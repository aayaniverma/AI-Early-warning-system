"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";
import LoginModal from "./LoginModal/LoginModal";



function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="center"></div>
      <div className="search-container flex w-full gap-2">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
        </div>
      </div>

      <div className="login-btn">
        <Button onClick={openLoginModal}>Login</Button>
      </div>

      {showLoginModal && <LoginModal closeModal={closeLoginModal} />}
    </div>
  );
}

export default Navbar